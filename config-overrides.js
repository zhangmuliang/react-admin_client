const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    // 针对antd实现按需打包，使用babel-plugin-import根据import打包
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // 自动打包相关样式
    }),
    addLessLoader({
        lessOptions: {
            modifyVars: { 
                '@primary-color': '#1DA57A' 
            },
            javascriptEnabled: true,
        },
    }),
);