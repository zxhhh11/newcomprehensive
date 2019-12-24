import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Button,
  Checkbox,
  Row,
  Col,
  DatePicker,
  Input,
  Cascader,
  message
} from 'antd';
import moment from 'moment';
import { getSessionStorage, removeSessionStorage } from '../../../utils/storage';

import options from '../../../utils/newCities';
import actions from '../../../actions/index';

const { Option } = Select;
class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {
        status: 1,
        colors: []
      }
    };
  }

  componentDidMount() {
    const { history } = this.props;
    let newDetail = [];
    if (history.location.state) {
      newDetail = history.location.state;
    } else if (getSessionStorage('project-detail')) {
      newDetail = getSessionStorage('project-detail');
    } else {
      newDetail = { colors: 7 };
    }
    const address = newDetail.address.split(' ');
    const arr = [0, 1, 2, 3, 4, 5, 6].slice(newDetail.colors);
    // eslint-disable-next-line react/destructuring-assignment
    const date = moment(newDetail.effectiveDate);
    this.setState({
      detail: { ...newDetail, colors: arr, priorities: [newDetail.priorities], effectiveDate: date, address }
    });
  }

  componentWillUnmount() {
    removeSessionStorage('project-detail');
    this.setState(() => {});
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, updateProject, history } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { effectiveDate } = values;
        console.log('Received values of form: ', values, effectiveDate);
        updateProject(values)
          .then(res => {
            console.log(res);
            if (res) {
              message.success('Project information modified successfully');
              history.push(`${process.env.PUBLIC_URL}/dashboard/analysis`);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  handleStatusChange = status => {
    console.log(status);
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const { detail } = this.state;
    console.log(detail);
    return (
      <div className='container' style={{ backgroundColor: '@white-back' }}>
        <div className='h-actions'>
          <Button type='primary'>Save</Button>
          <Button type='primary'>Update</Button>
          <Button type='primary'>Delete</Button>
        </div>
        <div className='clear'></div>

        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label='Project Name'>
            {getFieldDecorator('name', {
              initialValue: detail.name
            })(<Input disabled />)}
            {/* <span className='ant-form-text'>{detail.name}</span> */}
          </Form.Item>
          <Form.Item label='Project Name'>
            {getFieldDecorator('key', {
              initialValue: detail.key
            })(<Input disabled />)}
            {/* <span className='ant-form-text'>{detail.key}</span> */}
          </Form.Item>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Form.Item label='natural'>
            {getFieldDecorator('natural', {
              initialValue: detail.natural
            })(<Input />)}
          </Form.Item>
          <Form.Item label='E-mail'>
            {getFieldDecorator('email', {
              initialValue: detail.email,
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Habitual Residence'>
            {getFieldDecorator('address', {
              initialValue: detail.address,
              rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }]
            })(<Cascader options={options} />)}
          </Form.Item>
          <Form.Item hasFeedback label='Country'>
            {getFieldDecorator('country', {
              initialValue: detail.country,
              rules: [{ required: true, message: 'Please select your country!' }]
            })(
              <Select
                // onChange={this.handleStatusChange}
                placeholder='Please select a country'
                // setFieldsValue={detail.status}
              >
                <Option value={0}>China</Option>
                <Option value={1}>U.S.A</Option>
                <Option value={2}>Germany</Option>
                <Option value={3}>Japan</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label='Colors[multiple]'>
            {getFieldDecorator('colors', {
              initialValue: detail.colors,
              rules: [{ required: true, message: 'Please select your favorite colors!', type: 'array' }]
            })(
              //  const colorsTab = ['red', 'blue', 'yellow', 'white', 'black', 'green', 'gray'];
              <Select mode='multiple' placeholder='Please select favorite colors'>
                <Option value={0}>Red</Option>
                <Option value={1}>Blue</Option>
                <Option value={2}>Yellow</Option>
                <Option value={3}>White</Option>
                <Option value={4}>Black</Option>
                <Option value={5}> Green</Option>
                <Option value={6}>Gray</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label='Number'>
            {getFieldDecorator('number', { initialValue: detail.number })(<InputNumber max={16} min={1} />)}
            <span className='ant-form-text'> machines</span>
          </Form.Item>

          <Form.Item label='Support'>
            {getFieldDecorator('support', { valuePropName: 'checked', initialValue: detail.support })(<Switch />)}
          </Form.Item>

          <Form.Item label='Financing Mode'>
            {getFieldDecorator('mode', {
              initialValue: detail.mode
            })(
              <Radio.Group>
                <Radio value='a'>Standalone</Radio>
                <Radio value='b'>Co-financing</Radio>
                <Radio value='c'>Stock financing</Radio>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item label='Thematic Priorities'>
            {getFieldDecorator('priorities', {
              initialValue: detail.priorities
            })(
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  <Col span={24}>
                    <Checkbox value='d'>Sustainable Infrastructure</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value='e'>Cross Border Connectivity</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value='f'>Private Capital Mobilization</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value='g'>None of above priorities</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item label='Effective Date'>
            {getFieldDecorator('effectiveDate', {
              initialValue: detail.effectiveDate,
              rules: [{ required: true, message: 'Please select date!' }]
            })(<DatePicker format='YYYY-MM-DD' />)}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button htmlType='submit' type='primary'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    updateProject: option => {
      return dispatch(actions.project.updateProjectAction(option));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'validate_other' })(ProjectDetail));
