// import {
//     pickExclude
// } from '../common/utils';
const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;

function isImageUrl(url) {
    return IMAGE_REGEXP.test(url);
}
export function isImageFile(item) {
    if (item.isImage != null) {
        return item.isImage;
    }

    if (item.type) {
        return item.type === 'image';
    }

    if (item.url) {
        return isImageUrl(item.url);
    }

    return false;
}

function isPlainObject(val) {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
}

function pickExclude(obj, keys) {
    if (!isPlainObject(obj)) {
        return {};
    }

    return Object.keys(obj).reduce((prev, key) => {
        if (!keys.includes(key)) {
            prev[key] = obj[key];
        }

        return prev;
    }, {});
}

function formatImage(res) {
    return res.tempFiles.map((item) => ({
        ...pickExclude(item, ['path']),
        type: 'image',
        url: item.path,
        thumb: item.path,
    }));
}

function formatFile(
    res
) {
    return res.tempFiles.map((item) => ({
        ...pickExclude(item, ['path']),
        url: item.path,
    }));
}

export function chooseFile({
    accept,
    maxCount,
    multiple=true,
    sourceType = ['album', 'camera'],
    sizeType = ['original', 'compressed'],
}) {
    return new Promise((resolve, reject) => {
        switch (accept) {
            case 'img':
                wx.chooseImage({
                    count: multiple ? maxCount : 1,
                    sourceType,
                    sizeType,
                    success: (res) => resolve(formatImage(res)),
                    fail: reject,
                });
                break;
            default:
                wx.chooseMessageFile({
                    count: multiple ? maxCount : 1,
                    type: accept,
                    success: (res) => resolve(formatFile(res)),
                    fail: reject,
                });
                break;
        }
    });
}