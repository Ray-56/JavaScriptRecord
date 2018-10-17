## 七牛文档
[我在这里](https://developer.qiniu.com/kodo/sdk/1289/nodejs)

## 创建七牛服务
首先我们下载依赖包:
```
npm i qiniu busboy --save
```
依赖包下载以后, 我们新建七牛的服务文件:
`qn.js`
```js
/* 
 * **七牛上传文件服务**
 * 
 * 七牛对应机房对应的对象:
 * 华东 qiniu.zone.Zone_z0
 * 华北 qiniu.zone.Zone_z1
 * 华南 qiniu.zone.Zone_z2
 * 北美 qiniu.zone.Zone_na0
 */
const qiniu = require('qiniu');
const Busboy = require('busboy'); 
const path = require('path');
const fs = require('fs');
const accessKey = '你的AK'; // 在七牛个人中心/密钥管理 中查看
const secretKey = '你的SK';

module.exports = class Qn {
    // 写入目录 
    _mkdirsSync(dirname) {
        if(fs.existsSync(dirname)) { // 目录存在直接返回 true
            return true;
        };
        if(this._mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        };
        return false;
    }

    // 获取后缀名
    _getSuffix(fileName) {
        return fileName.split('.').pop();
    }

    // 重命名
    _rename(fileName) {
        return Math.random().toString(16).substr(2) + '.' + this._getSuffix(fileName);
    }

    // 删除文件
    _removeTemImage(path) {
        fs.unlink(path, err => {
            if (err) {
                throw err;
            };
        });
    }

    uptoQiniu(filePath, key) {
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const options = {
            scope: 'images', // 存储空间
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        const config = new qiniu.conf.Config();
        config.zone = qiniu.zone.Zone_z0; // 机房对象 华东
        const formUploader = new qiniu.form_up.FormUploader(config);
        const localFile = filePath; // 本地文件地址
        const putExtra = new qiniu.form_up.PutExtra();
    
        // 文件上传
        return new Promise((res, rej) => {
            formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
                if(respErr) {
                    rej(respErr);
                };
                // respInfo.statusCode === 200
                res(respBody);
    
                // 删除本地文件
                this._removeTemImage(filePath);
            });
        });
    }

    // 上传到本地服务器
    uploadFile(ctx, options) {
        const _busboy = new Busboy({headers: ctx.req.headers});
        const fileType = options.fileType;
        const filePath = path.join(options.path, fileType);
        const confirm = this._mkdirsSync(filePath);
        if(!confirm) return;

        return new Promise((res, rej) => {
            _busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                const fileName = this._rename(filename);
                const saveTo = path.join(path.join(filePath, fileName));
                file.pipe(fs.createWriteStream(saveTo));
                file.on('end', () => {
                    res({
                        imgPath: `/${fileType}/${fileName}`,
                        imgKey: fileName
                    })
                });
            });

            _busboy.on('finish', () => {
                console.log('finished...');
            });

            _busboy.on('error', (err) => {
                rej(err);
            });

            ctx.req.pipe(_busboy);
        });
    }
};
```

## 调用
在控制器(constructor)中新增上传方法:
```js
const Qn = require('./server/qn');
const qn = new Qn();
...
    async upload(ctx) {
        try {
            const rootPath = path.dirname(require.main.filename); // 根目录
            const serverPath = path.join(rootPath, './public/uploads/'); // 本地存储文件目录

            const result = await qn.uploadFile(ctx, {
                fileType: 'images', // 文件名称
                path: serverPath
            });
            const imgPath = path.join(serverPath, result.imgPath);
            const qiniu = await qn.uptoQiniu(imgPath, result.imgKey);
            const outUrl = '你的自己的外链'; // 七牛生成的外链地址(一个月生命)
            ctx.body = {
                success: true,
                imgUrl: `${outUrl}/${qiniu.key}`
            };
        } catch (err) {
            ctx.throw(err)
        }
    }
...
```

<a href="https://github.com/guokangf/serversTemp"  target="_blank">项目地址</a>