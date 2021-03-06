import React from "react";
import Layout from "../../components/Layout";
import Confirm from "../../components/Confirm";
import logo_notext from "../../assets/logo_notext.png";
import { getUserInfo, getUserById } from "../../config/config";
import s from "./index.css";

const projectId = localStorage.getItem("projectId");
const key = localStorage.getItem("key");
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      msg: ""
    };
  }

  componentDidMount() {
    this.handleGetUserInfo();
  }

  async handleGetUserInfo() {
    const userInfo = await getUserInfo();

    if (userInfo.success) {
      this.setState({
        userInfo: userInfo.data
      });
    } else {
      this.setState({
        msg: userInfo.msg
      });
    }
  }

  async handleSearch(e) {
    const id = this.input.value || "";
    const pattern = /\d/g;
    if (e.keyCode === 13) {
      if (pattern.test(id)) {
        const res = await getUserById({ userId: id });
        if (res.success) {
          this.setState({ userInfo: [res.data] });
        }
      } else {
        this.handleGetUserInfo();
      }
    }
  }

  render() {
    const { userInfo, msg } = this.state;
    return (
      <div className={s.container}>
        {!projectId || !key ? (
          <Confirm
            title="提示"
            tips={"请设置全局密钥后查看"}
            confirmText="马上设置"
          />
        ) : msg ? (
          <Confirm title="提示" tips={msg} confirmText="重新设置" />
        ) : null}
        <Layout />
        <div className={s.wrap}>
          <img src={logo_notext} alt="logo" />
          <input
            placeholder="通过id搜索用户信息"
            ref={input => (this.input = input)}
            onKeyDown={e => this.handleSearch(e)}
          />
          <div className={s.info}>
            <div className={s.title}>
              <p>用&nbsp;户&nbsp;ID</p>
              <p>用&nbsp;户&nbsp;名</p>
              <p>角&nbsp;色</p>
              <p>创&nbsp;建&nbsp;时&nbsp;间</p>
            </div>
            {userInfo && userInfo[0] ? (
              userInfo.map(info => (
                <div className={s.userInfo} key={info.id}>
                  <p>{info.id || "无"}</p>
                  <p>{info.username || "无"}</p>
                  <p>{info.role || "无"}</p>
                  <p>{info.createTime || "无"}</p>
                </div>
              ))
            ) : (
              <p className={s.common}>暂无用户信息</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default User;
