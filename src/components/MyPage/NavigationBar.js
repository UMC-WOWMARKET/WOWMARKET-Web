import { useParams } from "react-router-dom";
import { Link, Route, Switch } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setIsOpen(location.pathname.includes("/myproject"));
  }, [location.pathname]);

  const handleDropdownClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="NavigationBar">
      <div className="title">마이페이지</div>
      <div className="nav_box">
        <Link
          className={`myInfo ${
            location.pathname === "/myinfo" ? "active" : ""
          }`}
          to={"/myinfo"}
        >
          나의 정보
        </Link>
        <Link
          className={`myOrder ${
            location.pathname === "/myorder" ? "active" : ""
          }`}
          to={"/myorder"}
        >
          나의 주문폼
        </Link>
        <div className="myProjectDropdown" ref={dropdownRef}>
          <Link
            className={`myProject ${
              location.pathname.includes("/myproject") ? "active" : ""
            }`}
            //to="/myproject"
            onClick={(event) => {
              handleDropdownClick(event);
              navigate("/myproject");
            }}
          >
            나의 프로젝트
          </Link>
          {isOpen && (
            <div className="dropdown-menu">
              <Link
                className={`MyprojectMenu ${
                  location.pathname === "/myproject" ? "active" : ""
                }`}
                to="/myproject"
              >
                판매 등록폼 관리
              </Link>
              <br />
              <Link
                className={`MyprojectMenu" ${
                  location.pathname === "/myproject/order" ? "active" : ""
                }`}
                to="/myproject/order"
              >
                판매 주문폼 관리
              </Link>
              <br />
              <Link
                className={`MyprojectMenu" ${
                  location.pathname === "/myproject/demand" ? "active" : ""
                }`}
                to="/myproject/demand"
              >
                수요조사 등록폼 관리
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
