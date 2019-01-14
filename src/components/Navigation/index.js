import React from "react";
import PropsType from "prop-types";
import navLogo from "../../assets/navLogo.png";
import s from "./index.css";

class Navigation extends React.Component {
  static propsType = {
    hideNav: PropsType.func.isRequired
  };

  componentDidMount() {
    const { hideNav } = this.props;
    window.onscroll = () => {
      if (this.navagitor) {
        this.navagitor.className = s.fadeOut;
        setTimeout(() => hideNav(), 100);
      }
    };
  }

  hide = e => {
    const { hideNav } = this.props;
    if (e.target === e.currentTarget) {
      this.navagitor.className = s.fadeOut;
      setTimeout(() => hideNav(), 100);
    }
  };

  render() {
    return (
      <div className={s.container} onClick={this.hide}>
        <div className={s.navagitor} ref={div => (this.navagitor = div)}>
          <img className={s.img} src={navLogo} alt="logo" />
          <p>用户统计</p>
          <p>用户信息</p>
          <p>日志</p>
        </div>
      </div>
    );
  }
}

export default Navigation;