module.exports = {
    title:"Pasre",
    theme: '@vuepress/blog',
    themeConfig: {
        nav: [
            { text: '进修', link: '/study/' },
            { text: 'Blog', link: '/' },
            { text: '标签', link: '/tag/' },
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
                dirname: 'study',
                path: '/study/',
                itemPermalink: '/study/:slug'
            },
            {
                id: 'operation',
                dirname: 'operation',
                path: '/考研/操作系统/',
                itemPermalink: '/考研/操作系统/:slug'
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