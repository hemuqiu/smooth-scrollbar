'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleDragEvents = handleDragEvents;

var _helpers = require('../../helpers/');

var _utils = require('../utils/');

var _dom = require('../dom/');

var _render = require('../render/');

/**
 * Drag events handler
 * @private
 */
function handleDragEvents() {
    var _this = this;

    var _ref = _utils.getPrivateProp.call(this, 'targets'),
        container = _ref.container,
        content = _ref.content;

    var isDraging = false;
    var animation = void 0,
        padding = void 0;

    _utils.setPrivateProp.call(this, {
        get isDraging() {
            return isDraging;
        }
    });

    var scroll = function scroll(_ref2) {
        var x = _ref2.x,
            y = _ref2.y;

        if (!x && !y) return;

        var _ref3 = _utils.getPrivateProp.call(_this, 'options'),
            speed = _ref3.speed;

        _render.setMovement.call(_this, x * speed, y * speed);

        animation = requestAnimationFrame(function () {
            scroll({ x: x, y: y });
        });
    };

    _dom.addEvent.call(this, container, 'dragstart', function (evt) {
        isDraging = true;
        padding = evt.target.clientHeight;

        (0, _helpers.setStyle)(content, {
            'pointer-events': 'auto'
        });

        cancelAnimationFrame(animation);
        _dom.updateBounding.call(_this);
    });

    _dom.addEvent.call(this, document, 'dragover mousemove touchmove', function (evt) {
        if (!isDraging) return;
        cancelAnimationFrame(animation);
        evt.preventDefault();

        var dir = _dom.getPointerOffset.call(_this, evt, padding);

        scroll(dir);
    });

    _dom.addEvent.call(this, document, 'dragend mouseup touchend blur', function () {
        cancelAnimationFrame(animation);
        isDraging = false;
    });
};