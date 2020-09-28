module.exports = {
    title:"Pasre",
    theme: '@vuepress/blog',
    themeConfig: {
        nav: [
            { text: '考研', link: '/考研/' },
            { text: 'Blog', link: '/' },
            { text: '标签', link: '/tags/' },
            { text: '分类', link: '/category/' },
            { text: 'Git', link: 'http://git.pasre.cn/' },

        ],
        directories: [
            {
                id: 'blog',
                dirname: 'blog',
                path: '/',
                itemPermalink: '/blog/:year/:month/:day/:slug'
            },
            {
                id: 'study',
                dirname: 'study/main',
                path: '/考研/',
                itemPermalink: '/考研/:slug'
            },
            {
                id: 'operation',
                dirname: 'study/operation',
                path: '/考研/操作系统/',
                itemPermalink: '/考研/操作系统/:slug'
            },
            {
                id: 'network',
                dirname: 'study/network',
                path: '/考研/网络/',
                itemPermalink: '/考研/网络/:slug'
            },
            {
                id: 'csharp',
                dirname: 'csharp/main',
                path: '/csharp/',
                itemPermalink: '/csharp/:slug'
            },
            {
                id: 'csharp_version',
                dirname: 'csharp/version',
                path: '/csharp/version',
                itemPermalink: '/csharp/version/:slug'
            }
        ],
        frontmatters: [
            {
                id: 'tag',
                keys: ['tag','tags'],
                path: '/tags/',
                layout: 'Tags',
                scopeLayout: 'Tag'
            },
            {
                id: 'category',
                keys: ['category'],
                path: '/category/',
                layout: 'Tags',
                scopeLayout: 'Tag'
            }
        ],
        footer: {
            copyright: [
                {
                    text: 'pasre的个人主页 © 2018 苏ICP备18066717号-1',
                    link: 'http://www.beian.miit.gov.cn/icp/publish/query/icpMemoInfo_login.action'
                }
            ]
        },
        smoothScroll: true
    }
}