/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';
import zh_TW from 'antd/es/locale/zh_TW';
import fr_FR from 'antd/es/locale/fr_FR';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/home';
import Login from './views/login/index';
import NotFound from './views/notFound';
import { PrivateRoute } from './views/PrivateRoute';
import emit from './utils/emit';
// import { setHtmlFontSize, resetHtmlFontSize } from './utils/setHtmlFontSize';
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');
require('intl/locale-data/jsonp/fr.js');

const enUs = require('./locales/en_US.js').default;
const zhCN = require('./locales/zh_CN.js').default;
const zhTW = require('./locales/zh_TW.js').default;
const frFR = require('./locales/fr_FR.js').default;

const locales = {
  en_US: enUs,
  zh_CN: zhCN,
  zh_TW: zhTW,
  fr_FR: frFR
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      antdLang: en_US
    };
    // this.resize = () => {
    //   setHtmlFontSize();
    // };
  }

  componentDidMount() {
    emit.on('change_language', lang => this.loadLocales(lang)); // 监听语言改变事件
    this.loadLocales(); // 初始化语言
    // window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.resize);
    // resetHtmlFontSize();
  }

  loadLocales(lang = 'en_US') {
    intl
      .init({
        currentLocale: lang, // 设置初始语音
        locales
      })
      .then(() => {
        this.setState({
          antdLang: lang === 'zh_CN' ? zh_CN : lang === 'en_US' ? en_US : lang === 'zh_TW' ? zh_TW : fr_FR
        });
      });
  }

  render() {
    // setHtmlFontSize();
    return (
      // eslint-disable-next-line react/destructuring-assignment
      <ConfigProvider locale={this.state.antdLang}>
        <Router>
          <Switch>
            <Route component={Login} path={`${process.env.PUBLIC_URL}/login`} />
            <Route component={NotFound} path={`${process.env.PUBLIC_URL}/404`} />
            <PrivateRoute component={Home} path={`${process.env.PUBLIC_URL}/`} />
          </Switch>
        </Router>
      </ConfigProvider>
    );
  }
}

const mapStateToProps = state => ({
  test: state.user.test
});
const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
