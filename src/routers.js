const routers = [
  {
    key: 'dashboard',
    icon: 'dashboard',
    title: 'Dashboard',
    url: '',
    children: [
      {
        key: 'analysis',
        url: '/dashboard/analysis',
        title: 'Analysis',
        children: null
      },
      {
        key: 'monitor',
        url: '/dashboard/monitor',
        title: 'Monitor',
        children: null
      },
      {
        key: 'workplace',
        url: '/dashboard/workplace',
        title: 'Workplace',
        children: null
      }
    ]
  },
  {
    key: 'form',
    icon: 'form',
    title: 'Form',
    url: '',
    children: [
      {
        key: 'basic',
        url: '/form/basic',
        title: 'Basic Form',
        children: null
      },
      {
        key: 'step',
        url: '/form/step',
        title: 'Step Form',
        children: null
      },
      {
        key: 'advanced',
        url: '/form/advanced',
        title: 'Advanced Form',
        children: null
      }
    ]
  },
  {
    key: 'list',
    icon: 'unordered-list',
    title: 'List',
    url: '',
    children: [
      {
        key: 'basicList',
        url: '/list/basicList',
        title: 'Basic List',
        children: null
      },
      {
        key: 'cardList',
        url: '/list/cardList',
        title: 'Card List',
        children: null
      },
      {
        key: 'searchTable',
        url: '/list/searchTable',
        title: 'Search Table',
        children: null
      },
      {
        key: 'searchList',
        url: '',
        title: 'Search List',
        children: [
          {
            key: 'article',
            url: '/list/searchList/article',
            title: 'Article',
            children: null
          },
          {
            key: 'project',
            url: '/list/searchList/project',
            title: 'Project',
            children: null
          },
          {
            key: 'application',
            url: '/list/searchList/application',
            title: 'Application',
            children: null
          }
        ]
      }
    ]
  },
  {
    key: 'upload',
    icon: 'upload',
    title: 'Upload',
    url: '',
    children: [
      {
        key: 'basicUpload',
        url: '/upload/basicUpload',
        title: 'Basic Upload',
        children: null
      },
      {
        key: 'advancedUpload',
        url: '/upload/advancedUpload',
        title: 'Advanced Upload',
        children: null
      }
    ]
  },
  {
    key: 'charts',
    icon: 'area-chart',
    title: 'Charts',
    url: '/charts',
    children: null
  }
];

export { routers as default };
