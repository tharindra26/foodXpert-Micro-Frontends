import Logo from "./components/logo/Logo";
import './Header.css';
import { Button, Col, Input, Row, Space } from 'antd';
import type { GetProps, MenuProps } from 'antd';
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title } = Typography;

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

export default function Root(props) {

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: 'a danger item',
    },
  ];

  return (
    <>
      <Row className="header-bar" wrap={false}>
        <Col>
          <div className="logo">
            <Logo />
          </div>
        </Col>

        <Col>
          <Title level={4}>Welcome back, Tharindra</Title>
        </Col>

        <Col>
          <Dropdown menu={{ items }} placement="bottomLeft">

            <Avatar shape="square" size={48} icon={<UserOutlined />} />

          </Dropdown>
        </Col>

      </Row>
    </>
  );
}
