import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { AuthToken } from "helpers/Storage";
import ROUTES from "constants/routes";
import { logout } from "store/authentication/actions";
import {
  setCampaignIdValue,
  setPrepareDuplication,
  setErrorMessageCampaignIdSearch,
} from "store/duplication/duplicationSlice";
import {
  setUserInvitationInfo,
  setUserInvitationValue,
} from "store/userInvitation/userInvitationSlice";
import logOut from "assets/icons/logOut.svg";
import duplicationGray from "assets/icons/duplicationGray.svg";
import duplicationBlue from "assets/icons/duplicationBlue.svg";
import historyBlue from "assets/icons/historyBlue.svg";
import historyGray from "assets/icons/historyGray.svg";
import inviteGray from "assets/icons/inviteGray.svg";
import inviteBlue from "assets/icons/inviteBlue.svg";
import CustomLink from "components/CustomLink/CustomLink";

const SideBar = ({ open, sideNavBarWidth, innerRef }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { email, name } = jwt_decode(AuthToken.get("access_token"));

  const navBarLinks = [
    {
      icon:
        location.pathname === ROUTES.DUPLICATION ? (
          <img src={duplicationBlue} alt="duplication" />
        ) : (
          <img src={duplicationGray} alt="duplication" />
        ),
      label: "Duplication",
      to: ROUTES.DUPLICATION,
    },
    {
      icon:
        location.pathname === ROUTES.ALL_DUPLICATIONS ? (
          <img src={historyBlue} alt="All duplications" />
        ) : (
          <img src={historyGray} alt="All duplications" />
        ),
      label: "All duplications",
      to: ROUTES.ALL_DUPLICATIONS,
    },
    {
      icon:
        location.pathname === ROUTES.INVITE_NEW_USER ? (
          <img src={inviteBlue} alt="invite new user" />
        ) : (
          <img src={inviteGray} alt="invite new user" />
        ),
      label: "Invite",
      to: ROUTES.INVITE_NEW_USER,
    },
  ];

  const handleMenuItemClick = (label) => {
    if (label === "Invite") {
      dispatch(setUserInvitationValue("")) &&
        dispatch(setUserInvitationInfo({ isSent: null, message: "" }));
    } else if (label === "Duplication") {
      dispatch(setCampaignIdValue(""));
      dispatch(setPrepareDuplication({}));
      dispatch(setCampaignIdValue(""));
      dispatch(setErrorMessageCampaignIdSearch(""));
    }
  };

  return (
    <aside
      style={{
        width: sideNavBarWidth,
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
      ref={innerRef}
    >
      <ul style={{ textAlign: "center", marginTop: "32px" }}>
        {navBarLinks.map(({ label, icon, to }, index) => {
          return (
            <li
              key={label + index}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => handleMenuItemClick(label)}
            >
              <CustomLink open={open} to={to}>
                {icon}
                <span
                  style={{
                    marginLeft: "8px",
                    fontWeight: 400,
                    fontSize: "18px",
                  }}
                >
                  {label}
                </span>
              </CustomLink>
            </li>
          );
        })}
      </ul>
      <div
        className="user-info"
        style={{
          padding: open ? "0" : "unset",
          overflow: "hidden",
        }}
      >
        {
          <div
            className="contents"
            style={{
              width: open ? "calc(100%)" : "0",
              overflow: "hidden",
              transition: " 0.3s",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "calc(100% - 16px)",
              }}
            >
              <h4>{name}</h4>
              <span>{email}</span>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#D9D9D9",
                  marginTop: "16px",
                }}
              ></div>
            </div>
          </div>
        }

        <div
          className="contents"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => dispatch(logout())}
        >
          <img src={logOut} alt="logout" style={{ paddingLeft: "8px" }} />
          {open && (
            <span
              style={{
                marginLeft: "8px",
                fontWeight: "300",
                fontSize: "18px",
                whiteSpace: "no-wrap",
                color: "#B9B9B9",
              }}
            >
              Log out
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
