var imageCommon = require("./image-common");
var style = require("ui/styling/style");
global.moduleMerge(imageCommon, exports);
var enums;
function ensureEnums() {
    if (!enums) {
        enums = require("ui/enums");
    }
}
function onStretchPropertyChanged(data) {
    var image = data.object;
    if (!image.android) {
        return;
    }
    ensureEnums();
    switch (data.newValue) {
        case enums.Stretch.aspectFit:
            image.android.setScaleType(android.widget.ImageView.ScaleType.FIT_CENTER);
            break;
        case enums.Stretch.aspectFill:
            image.android.setScaleType(android.widget.ImageView.ScaleType.CENTER_CROP);
            break;
        case enums.Stretch.fill:
            image.android.setScaleType(android.widget.ImageView.ScaleType.FIT_XY);
            break;
        case enums.Stretch.none:
        default:
            image.android.setScaleType(android.widget.ImageView.ScaleType.MATRIX);
            break;
    }
}
function onImageSourcePropertyChanged(data) {
    var image = data.object;
    if (!image.android) {
        return;
    }
    image._setNativeImage(data.newValue ? data.newValue.android : null);
}
imageCommon.Image.imageSourceProperty.metadata.onSetNativeValue = onImageSourcePropertyChanged;
imageCommon.Image.stretchProperty.metadata.onSetNativeValue = onStretchPropertyChanged;
var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Image.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Image.prototype._createUI = function () {
        this._android = new org.nativescript.widgets.ImageView(this._context);
    };
    Image.prototype._setNativeImage = function (nativeImage) {
        this.android.setImageBitmap(nativeImage);
    };
    return Image;
}(imageCommon.Image));
exports.Image = Image;
var ImageStyler = (function () {
    function ImageStyler() {
    }
    ImageStyler.setTintColorProperty = function (view, newValue) {
        var imageView = view._nativeView;
        imageView.setColorFilter(newValue);
    };
    ImageStyler.resetTintColorProperty = function (view, nativeValue) {
        var imageView = view._nativeView;
        imageView.clearColorFilter();
    };
    ImageStyler.registerHandlers = function () {
        style.registerHandler(style.tintColorProperty, new style.StylePropertyChangedHandler(ImageStyler.setTintColorProperty, ImageStyler.resetTintColorProperty), "Image");
    };
    return ImageStyler;
}());
exports.ImageStyler = ImageStyler;
ImageStyler.registerHandlers();
//# sourceMappingURL=image.js.map