var ContractTemplateEditor = (function () {
    var Draggable = function (container, obj, border) {
        var holder = {}, _this = this;

        $(container.editor.editable().$).on('mousedown touchstart', obj, function (e) {
            e.preventDefault();

            var t = holder.target = $(e.target);
            holder.mouse = {x: e.pageX, y: e.pageY};
            holder.from = {x: parseInt(t.css('left').replace('px', '')), y: parseInt(t.css('top').replace('px', ''))};
            holder.moving = true;
            this.moved = false;
            t.css('z-index', 998);

            container.editor.fire('before_move', {position: holder.from, target: e.target});
            // var evt = $.Event('before_move', {position: holder.from, target: e.target});
            // container.trigger(evt);
        }).on('mousemove touchmove', function (e) {
            if (holder.moving) e.preventDefault();

            if (holder.moving) {
                var offset = {x: e.pageX - holder.mouse.x, y: e.pageY - holder.mouse.y};

                var pos = {x: holder.from.x + offset.x, y: holder.from.y + offset.y};
                pos.x = Math.min(Math.max(pos.x, border.left), border.right);
                pos.x = Math.min(Math.max(pos.x, border.top), border.bottom);
                holder.target.css('left', pos.x + 'px').css('top', pos.y + 'px');
                container.editor.fire('moving', {position: pos, target: e.target});

                // var evt = $.Event('moving', {position: pos, target: e.target});
                // container.trigger(evt);

                if (_this.moved) return ;
                if (Math.abs(offset.x) > 3 || Math.abs(offset.y) > 3) {
                    _this.moved = true;
                }
            }
        }).on('mouseup touchend', function (e) {
            if (holder.moving) e.preventDefault();

            if (holder.moving) {
                var t = holder.target;
                var offset = {x: e.pageX - holder.mouse.x, y: e.pageY - holder.mouse.y};
                var pos = {x: parseInt(t.css('left').replace('px', '')), y: parseInt(t.css('top').replace('px', ''))};
                t.css('z-index', t.index());

                container.editor.fire('moved', {position: pos, offset: offset, target: e.target});
                // var evt = $.Event('moved', {position: pos, offset: offset, target: e.target});
                // container.trigger(evt);
            }
            holder.moving = false;
        }).on('dragstart', obj, function (e) {
            e.preventDefault();
            return false;
        });
    };

    var EditorWrapperPrototypes = {
        templateId: '',
        isChanged: false,
        /**
         * signers: [
         *   {
         *     type: (string)
         *     left: (float)
         *     top: (float)
         *   }
         * ]
         */
        params: {},
        saving: false,
        signerContainer: null,
        selectedSigner: -1,

        lock: function () {
            this.setReadOnly(true);
        },
        unlock: function () {
            this.setReadOnly(false);
        },
        setChanged: function (isChanged) {
            this.isChanged = isChanged;
            isChanged ? this.getCommand('save').enable() : this.getCommand('save').disable();
            return isChanged;
        },
        saveContent: function (cb, async) {
            if (!this.isChanged || this.saving) return 'function' == typeof cb && cb(true);

            this.setChanged(false);
            this.saving = true;
            var _this = this;

            if (this.signerContainer == null || this.signerContainer.parent().length == 0) {
                this.setData(makeSignersContainerHtml(this.params.signers || []) + (this.getData().replace(/^\s+|\s+$/g, '') || "<p></p>"), {
                    callback: function () {
                        _this.signerContainer = $(_this.editable().$).find('.signers');
                    }
                });
            }

            $.ajax({
                type: 'POST',
                url: '/template/template/update',
                data: {id:this.templateId, content:this.getData()},
                dataType: 'json',
                async: async !== false,
                success: function (json) {
                    'function' == typeof cb && cb(json.success);
                }
            }).fail(function (xhr, error, message) {
                if (xhr.status >= 300) {
                    dialog.alert('服务器报错，错误码：' + xhr.status + ", 服务器返回: " + (message || ""), '请注意保存');
                    _this.lock();
                    return ;
                }
                'function' == typeof cb && cb(false);
                _this.setChanged(true);
            }).always(function (e) {
                _this.saving = false;
            });
        },
        saveParams: function (cb) {
            $.ajax({
                type: 'POST',
                url: '/template/template/update-params',
                data: {id: this.templateId, params: JSON.stringify(this.params)},
                dataType: 'json',
                success: function (json) {
                    'function' == typeof cb && cb(json.success);
                }
            }).fail(function () {
                'function' == typeof cb && cb(false);
            });
        },
        load: function (id, cb) {
            var _this = this;
            if (this.isChanged) {
                if (this.saveTimer) clearInterval(this.saveTimer);
                this.saveContent(function () {
                    _this.load(id, cb);
                });
                return ;
            }
            this.templateId = id;
            $.ajax({
                type: 'POST',
                url: '/template/template/show',
                data: {id: id},
                dataType: 'json',
                success: function (json) {
                    if (!json.success) {
                        dialog.alert(json.error);
                        return ;
                    }

                    if (json.is_lock) {
                        _this.lock();
                    } else {
                        _this.unlock();
                    }

                    try {
                        _this.params = JSON.parse(json.params) || {};
                    } catch(e) {
                        _this.params = {};
                    }

                    var h = makeSignersContainerHtml(_this.params.signers || []) + (json.content.replace(/^\s+|\s+$/g, '') || "<p></p>");
                    _this.setData(h, {
                        callback: function () {
                            _this.window.$.document.title = json.name || "合同";
                            _this.signerContainer = $(_this.editable().$).find('.signers');
                            _this.signerContainer.editor = _this;
                            if (!_this.readOnly) {
                                _this.signerContainer.on('click', 'img', function (e) {
                                    if (!_this.signerContainer.drag || _this.signerContainer.drag && !_this.signerContainer.drag.moved) {
                                        var index = $(e.target).index() - 1;
                                        var selected = _this.selectedSigner != index;
                                        _this.selectedSigner = selected ? index : -1;
                                        _this.signerContainer.trigger($.Event('signer.selected', {selected: selected, index: index, target: e.target}));
                                    } else if (_this.signerContainer.drag) {
                                        _this.signerContainer.drag.moved = false;
                                    }

                                    _this.focus();
                                });
                            }
                            if (!_this.signerContainer.drag && !_this.readOnly) {
                                var bd = $(_this.editable().$);
                                var left = parseInt(bd.css('padding-left'));
                                var top = parseInt(bd.css('padding-top'));
                                var right = parseInt(bd.css('padding-right'));
                                var bottom = parseInt(bd.css('padding-bottom'));
                                var width = bd.width();
                                var height = bd.height();
                                var cover = _this.signerContainer.find('.signer-cover');
                                _this.signerContainer.drag = new Draggable(_this.signerContainer, 'img', {left: left - 10, top: top - 10, right: width - left - right + 70, bottom: height - top - bottom + 70});
                                _this.signerContainer.on('signer.selected', function (e) {
                                    _this.signerContainer.find('.selected').removeClass('selected');
                                    if (e.selected) {
                                        _this.signerContainer.find('img:eq(n)'.replace('n', e.index)).addClass('selected');
                                        cover.html(e.index + 1 + "");
                                        cover.css({'left': $(e.target).css('left'), 'top': $(e.target).css('top')}).show();
                                    } else {
                                        cover.hide();
                                    }
                                });
                                _this.on('moved', function (e) {
                                    var index = $(e.data.target).index() - 1;
                                    _this.params.signers[index].left = e.data.position.x;
                                    _this.params.signers[index].top = e.data.position.y;
                                    if (Math.abs(e.data.offset.x) < 1 && Math.abs(e.data.offset.y) < 1) return ;
                                    _this.saveParams();
                                });
                                _this.on('moving', function (e) {
                                    if ($(e.data.target).index() - 1 == _this.selectedSigner) {
                                        cover.css({'left': e.data.position.x + 'px', 'top': e.data.position.y + 'px'});
                                    }
                                })
                            }

                            setInterval(function () {
                                _this.saveContent();
                            }, 10000);
                        }
                    });
                    if (!this.readOnly) {
                        this.saveTimer = _this.on('change', function () {
                            _this.setChanged(true);
                        });
                    }
                    _this.on('key', function (evt) {
                        if ((evt.data.keyCode == /*BackSpace*/ 8 || evt.data.keyCode == /* Delete */ 46)) {
                            if (_this.selectedSigner > -1) {
                                _this.removeSigner(_this.selectedSigner);
                                evt.cancel();
                            } else {
                                if (this.signerContainer == null || this.signerContainer.parent().length == 0) {
                                    this.setData(makeSignersContainerHtml(this.params.signers || []) + (this.getData().replace(/^\s+|\s+$/g, '') || "<p></p>"), {
                                        callback: function () {
                                            _this.signerContainer = $(_this.editable().$).find('.signers');
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            });

            document.body.onbeforeunload = function () {
                if (_this.isChanged) {
                    _this.saveContent(null, false);
                }
            }
        },
        getSigners: function () {
            return this.params.signers || [];
        },
        getParams: function () {
            return this.params || {};
        },
        addSigner: function (signer) {
            this.params.signers || (this.params.signers = []);
            var exists = false;
            $.each(this.params.signers, function (idx, item) {
                if (item.id == signer.id) {
                    exists = true;
                    return false;
                }
            });

            if (exists) {
                alert('已经添加' + signer.name + ", 同一份合同中仅可以签章一次");
                return false;
            }

            this.signerContainer.append(makeSignerHtml(signer));
            this.params.signers.push(signer);
            this.saveParams();
        },
        removeSigner: function (index) {
            if (!$.isNumeric(index)) throw new Error('signer {' + index + "} not found");
            if (this.params.signers.length - 1 >= index && index > -1) {
                this.params.signers.splice(index, 1);
                this.signerContainer.find("img:eq(" + index + ")").remove();
                if (this.selectedSigner == index) {
                    this.signerContainer.find('.signer-cover').hide();
                    this.selectedSigner = -1;
                }
                this.saveParams();
            } else {
                throw new Error('signer {' + index + "} not found");
            }
        }
    };
    
    function makeSignersHtml(signers) {
        var imgs = [];
        $.each(signers, function () {
            imgs.push(makeSignerHtml(this));
        });

        return imgs.join("");
    }

    function makeSignerHtml(signer) {
        return '<img src="' + signer.image + '" data-id="' + signer.id + '" class="signer" draggable="false" style="left: ' + signer.left + 'px; top: ' + signer.top + 'px;">'
    }

    function makeSignersContainerHtml(signers) {
        return '<div class="signers" contenteditable="false"><span class="signer-cover" contenteditable="false">1</span>' + makeSignersHtml(signers) + '</div>';
    }

    var EditorWrapper = {
        render: function (textarea, options) {
            options = options || {};
            options.readOnly = true;
            options.customConfig = '/res/js/contract_template_editor_config.js';
            options.contentsCss = ['/ckeditor/contents.css?t=H7HD', '/res/css/contract_template_editor.css'];
            var editor = CKEDITOR.replace(textarea, options);

            editor.on('save', function (evt) {
                dialog.loading(4);
                editor.saveContent(function () {
                    dialog.close();
                });
            });

            editor.on('getData', function (evt) {
                var d = evt.data.dataValue;
                d = d.replace(/<div\s+class="signers".*?>[\w\W]+?<\/div>/, '');
                evt.data.dataValue = d;
            });

            $.extend(editor, EditorWrapperPrototypes);

            return editor;
        }
    };

    return EditorWrapper;
})();