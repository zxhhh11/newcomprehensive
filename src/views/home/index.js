import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon, Button, Drawer, Row, Col, Switch, Breadcrumb, Dropdown, Tabs, Modal } from 'antd';
import { getThemeColor, changeAntdTheme } from 'dynamic-antd-theme';
import { Route, Switch as RouteSwitch, Redirect, withRouter, Link } from 'react-router-dom';
import intl from 'react-intl-universal';
import { useSelector, useDispatch } from 'react-redux';
import Upload from './upload/index';
import List from './list/index';
import Form from './form/index';
import Dashboard from './dashboard/index';
import Charts from './charts/index';
import { setSessionStorage, getSessionStorage, removeSessionStorage } from '../../utils/storage';
import emit from '../../utils/emit';
import routers from '../../routers';
import actions from '../../actions/index';
import { setHtmlFontSize, resetHtmlFontSize } from '../../utils/setHtmlFontSize';

// import NoFound from '../NotFound';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

// 根据路由配置的面包屑导航
const breadcrumbNameMap = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/dashboard/analysis': 'Analysis',
  '/dashboard/monitor': 'Monitor',
  '/dashboard/workplace': 'Workplace',
  '/dashboard/projectDetail': 'Project Detail',
  '/list': 'List',
  '/list/basicList': 'Basic',
  '/list/cardList': 'Card',
  '/list/searchTable': 'Search Table',
  '/list/searchList': 'Search List',
  '/list/searchList/application': 'Application',
  '/list/searchList/article': 'Article',
  '/list/searchList/project': 'Project',
  '/form': 'Form',
  '/form/advanced': 'Advanced Form',
  '/form/basic': 'Basic Form',
  '/form/step': 'Step Form',
  '/upload': 'Upload',
  '/upload/advancedUpload': 'Advanced',
  '/upload/basicUpload': 'Basic',
  '/charts': 'Charts'
};

// 模拟类组件的componentDidMount 生命周期
// function useDidMount(fn) {
//   // 依赖项给空数组，只会执行一次 模拟类组件的componentDidMount
//   useEffect(fn, []);
// }

const Home = withRouter(({ history, location }) => {
  const colors = [
    'rgb(245, 34, 45)',
    'rgb(250, 84, 28)',
    'rgb(250, 173, 20)',
    'rgb(19, 194, 194)',
    'rgb(82, 196, 26)',
    'rgb(24, 144, 255)',
    'rgb(47, 84, 235)',
    'rgb(114, 46, 209)'
  ];
  const [checkColor, setCheckColor] = useState(getSessionStorage('color') || '#1da57a');
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(getSessionStorage('theme') || 'dark');
  const [logoDisplay, setLogoDisplay] = useState('inline-block');
  const [navDirection, setNavDirection] = useState(getSessionStorage('direction') || 'inline');
  const [current, setCurrent] = useState(getSessionStorage('current') || 'analysis');
  const [showDrawer, setShowDrawer] = useState(false);
  const [bellVisible, setBellVisible] = useState(false);
  const [openKeyState, setOpenKeyState] = useState([]);

  /** ***********redux**************** */
  const dispatch = useDispatch();
  const num = useSelector(state => state.user.num);
  // 用来设计当前menu 展开项最多为一项
  const rootSubmenuKeys = ['dashboard', 'form', 'list', 'upload'];
  // 根据路由动态渲染面包屑导航
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key='home'>
      <Link to='/'>Home</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);
  // 重新设置页面字体大小 即页面自适应
  const resizeEvent = () => {
    setHtmlFontSize();
  };
  useEffect(() => {
    console.log(num);
    setHtmlFontSize();
    window.addEventListener('resize', resizeEvent);
    if (navDirection === 'inline') {
      setOpenKeyState(getSessionStorage('openKeyState') || ['dashboard']);
    }
    // 页面初始化时设置主题按钮...primary-color 颜色
    changeAntdTheme(getThemeColor(getSessionStorage('color') || '#1da57a'));

    // TODO: 让导航高亮跟随路由变化进行相应变化
    const mode = history.location.pathname;
    const highlight = mode.substr(mode.lastIndexOf('/') + 1);

    setCurrent(highlight);
    setSessionStorage('current', highlight);
    const unlisten = history.listen(route => {
      const text = route.pathname;
      const arr = text.split('/');

      // 若路由变化为/或者login 则不需要设置当前光亮的menu 及展开项
      if (text === '/login' || text === '/') {
        return;
      }
      if (text === '/dashboard') {
        return;
      }
      if (text === '/dashboard/projectDetail') {
        // setNavDirection('horizontal');
        // setOpenKeyState([]);
        // setCurrent(null);
      }

      const textHighlight = text.substr(text.lastIndexOf('/') + 1);
      if (navDirection === 'inline') {
        // 竖导航时当前展开项随高亮的Menu.Item的变化而变化
        arr.shift();
        arr.pop();
        setOpenKeyState(arr);
        setSessionStorage('openKeyState', arr);
      }
      setCurrent(textHighlight);
      setSessionStorage('current', textHighlight);
    });
    return () => {
      // 解绑history监听
      window.removeEventListener('resize', resizeEvent);
      unlisten();
      resetHtmlFontSize();
      console.log('leave');
    };
  }, []);
  // 导航展开和折起时触发的函数
  const onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => openKeyState.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeyState(openKeys);
    } else {
      setOpenKeyState(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  // 更改系统语言
  function changeLocale(value) {
    localStorage.setItem('lang', value);
    emit.emit('change_language', value);
  }
  // 退出登录事件 useCallback() 会返回被它包裹的函数的memorized版本，只要依赖项不变，memorized的函数就不会更新
  const logoutFunc = () => {
    console.log('‘res');
    dispatch(actions.user.handleLogout()).then(res => {
      if (res.data === 'ok') {
        removeSessionStorage('auth_user');
        history.push(`${process.env.PUBLIC_URL}/login`);
      }
    });
  };
  // 设置竖导航的展开还是收起 以及logo 文字部分的显示还是隐藏  menu组的展示还是收起
  function toggle() {
    if (!collapsed) {
      setLogoDisplay('none');
      setOpenKeyState([]);
    } else {
      setLogoDisplay('inline-block');
      setOpenKeyState(getSessionStorage('openKeyState') || ['dashboard']);
    }
    setCollapsed(!collapsed);
  }
  // 主题切换
  function setThemeClick(newTheme) {
    const isDarkTheme = newTheme === true ? 'dark' : 'light';
    setTheme(isDarkTheme);
    setSessionStorage('theme', isDarkTheme);
  }
  // 设置显示横导航还是竖导航
  function setNavDirectionClick(newDirection) {
    const openKeys = getSessionStorage('openKeyState');
    const direct = newDirection === true ? 'inline' : 'horizontal';
    setCollapsed(!newDirection);
    setNavDirection(direct);
    if (newDirection) {
      setOpenKeyState(openKeys);
    } else {
      setOpenKeyState([]);
    }
    setSessionStorage('direction', direct);
  }
  // 单个导航切换事件
  // function handleClick(e) {
  //   // const openKeys = e.keyPath;
  //   // openKeys.shift();
  //   // //  setCurrent(e.key);
  //   // // setOpenKeyState(openKeys)
  //   // setSessionStorage('openKeyState', openKeys);
  // }
  // 控制右侧主题样式的弹框的显示和隐藏
  function onDrawerToggle() {
    const isShow = showDrawer !== true;
    setShowDrawer(isShow);
  }
  // bell 消息弹框隐藏显示事件
  function bellModalToggle() {
    const visible = bellVisible !== true;
    setBellVisible(visible);
  }

  function getMenus(arr) {
    return arr.map(val => {
      return val.children ? (
        <SubMenu
          key={val.key}
          title={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <span>
              {val.icon && <Icon type={val.icon} />}
              <span>{val.title}</span>
            </span>
          }
        >
          {getMenus(val.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={val.key}>
          {val.icon ? (
            <span key={val.url} onClick={() => history.push(`${process.env.PUBLIC_URL}${val.url}`)}>
              <Icon type={val.icon} />
              <span>{val.title}</span>
            </span>
          ) : (
            <Link to={`${process.env.PUBLIC_URL}${val.url}`}>{val.title}</Link>
          )}
        </Menu.Item>
      );
    });
  }
  // 横导航右侧消息按钮弹出框
  const bell = (
    <div>
      <Modal
        className='bell-dialog'
        closable={false}
        footer={null}
        mask={false}
        onCancel={bellModalToggle}
        visible={bellVisible}
      >
        <Tabs defaultActiveKey='1' style={{ height: 220 }} tabPosition='top'>
          {['notifications', 'message', 'event'].map(i => (
            <TabPane key={i} tab={i}>
              Content of tab
              {i}
            </TabPane>
          ))}
        </Tabs>
      </Modal>
    </div>
  );
  // 横导航右侧国际化按钮
  const menu = (
    <Menu>
      <Menu.Item className='language' onClick={() => changeLocale('en_US')}>
        English
      </Menu.Item>
      <Menu.Item className='language' onClick={() => changeLocale('fr_FR')}>
        Français
      </Menu.Item>
      <SubMenu className='language' title='中文'>
        <Menu.Item className='language' onClick={() => changeLocale('zh_CN')}>
          简体中文
        </Menu.Item>
        <Menu.Item className='language' onClick={() => changeLocale('zh_TW')}>
          繁體中文
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
  // 导航menu dom绘制
  const inlineMenuBox = (
    <Menu
      mode={navDirection}
      // onClick={handleClick}
      onOpenChange={onOpenChange}
      openKeys={openKeyState}
      // 当前menu展开项最多为一 ，若展开其它menu，则当前menu折叠
      // 在横导航时关掉默认展开的第一个折叠menu
      selectedKeys={[current]}
      theme={theme}
    >
      {getMenus(routers)}
    </Menu>
  );

  const horizontalMenuBox = (
    <Menu
      defaultOpenKeys={[]}
      mode={navDirection}
      // onClick={handleClick}
      selectedKeys={[current]}
      style={{
        Width: '100vw',
        margin: 'auto',
        paddingLeft: '200px',
        height: '64px',
        lineHeight: '64px'
      }}
      theme={theme}
    >
      {getMenus(routers)}
    </Menu>
  );

  return (
    <Layout>
      {/* { noFound ? <NoFound></NoFound> : */}
      <Sider
        collapsed={collapsed}
        collapsible
        style={{
          backgroundColor: theme === 'dark' ? '#001529' : '#fff',
          display: navDirection === 'inline' ? 'inline-block' : 'none',
          minHeight: '100%'
        }}
        trigger={null}
      >
        <div className='logo' style={{ color: checkColor, fontWeight: 800 }}>
          <Icon type='ant-design' />
          <span style={{ display: logoDisplay }}>&nbsp;Amber</span>
        </div>
        {inlineMenuBox}
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          {/*  icon 控制竖导航的展开还是折叠 是否显示文字的那种 */}
          <Icon
            className='trigger'
            onClick={toggle}
            style={{
              display: navDirection === 'inline' ? 'inline-block' : 'none'
            }}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
          />
          {navDirection === 'horizontal' && (
            <div
              className='logo'
              style={{
                color: checkColor,
                fontWeight: 800,
                position: 'absolute',
                top: 0,
                left: '30px'
              }}
            >
              <Icon type='ant-design' />
              <span>&nbsp;Amber</span>
            </div>
          )}
          {navDirection === 'horizontal' && horizontalMenuBox}
          <div
            className='header-right'
            style={{
              fontSize: '18px',
              position: 'absolute',
              right: '16px',
              top: 0,
              color: navDirection === 'inline' ? '#333' : theme === 'dark' ? '#fff' : '#333'
            }}
          >
            <span onClick={bellModalToggle} role='presentation'>
              <i className='ant-dropdown-link'>
                <Icon type='bell' />
              </i>
            </span>
            <span>
              <Dropdown overlay={menu} placement='bottomRight' trigger={['click']}>
                <i className='ant-dropdown-link'>
                  <Icon type='global' />
                </i>
              </Dropdown>
            </span>
            <span onClick={onDrawerToggle} role='presentation'>
              <i className='ant-dropdown-link' href='#'>
                <Icon type='setting' />
              </i>
            </span>
          </div>
          {bell}
        </Header>
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        <div
          /** * TODO: IE10 table 横向滚动条失效 Content** */
          className='ant-layout-content'
          // style={{
          //   background: '#fff',
          //   padding: 24,
          //   margin: '0 16px',
          //   minHeight: 280
          // }}
        >
          <RouteSwitch>
            <Route component={Dashboard} path={`${process.env.PUBLIC_URL}/dashboard`} />
            <Route component={List} path={`${process.env.PUBLIC_URL}/list`} />
            <Route component={Form} path={`${process.env.PUBLIC_URL}/form`} />
            <Route component={Upload} path={`${process.env.PUBLIC_URL}/upload`} />
            <Route component={Charts} path={`${process.env.PUBLIC_URL}/charts`} />
            <Redirect exact path={`${process.env.PUBLIC_URL}/`} to={`${process.env.PUBLIC_URL}/dashboard`} />
            <Redirect from='*' to='/404' />
          </RouteSwitch>

          <Drawer
            closable
            getContainer={false}
            onClose={onDrawerToggle}
            placement='right'
            title='Basic Setting'
            visible={showDrawer}
          >
            <div className='set-style'>
              <h3>Page Style Setting</h3>
              <Switch
                checkedChildren='Dark'
                defaultChecked={getSessionStorage('theme') === 'dark'}
                onChange={setThemeClick}
                unCheckedChildren='light'
              />
            </div>
            <div className='set-style'>
              <h3>Navigation Mode</h3>
              <Switch
                checkedChildren='V'
                defaultChecked={getSessionStorage('direction') === 'inline'}
                onChange={setNavDirectionClick}
                unCheckedChildren='H'
              />
            </div>
            <hr />
            <div className='set-style'>
              <h3>Theme Color</h3>
              <Row>
                {colors.map(val => {
                  return (
                    <Col key={val} span={6} style={{ margin: '10px 0' }}>
                      <Button
                        icon={checkColor === val ? 'check' : 'heart'}
                        onClick={() => {
                          const color = val;
                          changeAntdTheme(getThemeColor(color));
                          setCheckColor(val);
                          setSessionStorage('color', val);
                        }}
                        style={{ backgroundColor: val, borderColor: val }}
                        type='primary'
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
            <br />
            <h3>Log out</h3>
            <Button icon='logout' onClick={logoutFunc} type='primary' />
            {/* <div className='h-menus'>{intl.get('SIMPLE')}</div> */}
          </Drawer>
        </div>
        <Footer style={{ textAlign: 'center' }}>Practice ©2019 Created by Amber</Footer>
      </Layout>
    </Layout>
  );
});

export default Home;
