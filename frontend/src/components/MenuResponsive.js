// import styles from "../styles/";
// import { connect } from "react-redux";
// import usersActions from "../redux/actions/usersActions";
// import { NavLink, Link } from "react-router-dom";

// const MenuResponsive = (props) => {
//   const showMenu = () => {
//     if (props.menu) {
//       props.showMenuResponsive(false);
//     } else {
//       props.showMenuResponsive(true);
//     }
//   };

//   return (
//     <div className={styles.menuResponsive}>
//       <svg
//         onClick={showMenu}
//         xmlns="http://www.w3.org/2000/svg"
//         className={styles.equisResponsive}
//         fill="currentColor"
//         viewBox="0 0 16 16"
//       >
//         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
//       </svg>
//       <div
//         className={styles.logoR}
//         style={{
//           backgroundImage: 'url("/assets/LogoRuleta.png")',
//         }}
//       ></div>
//       {props.token && (
//         <div className={styles.login}>
//           <div
//             className={styles.userPic}
//             style={{
//               backgroundImage: `url('${props.avatar}')`,
//               backgroundPosition: "center",
//               backgroundSize: "cover",
//               borderRadius: "50%",
//             }}
//           ></div>
//           <p>Hello, {props.username}!</p>
//         </div>
//       )}
//       <nav>
//       {document.title != "Nosy" && (
//             <NavLink to="/">
//               <p>HOME</p>
//             </NavLink>
//           )}
//         <a onClick={showMenu} href="#howToPlay">
//           HOW TO PLAY
//         </a>
//         <a onClick={showMenu} href="#nextGames">
//           NEXT GAMES
//         </a>
//         <a onClick={showMenu} href="#reviews">
//           REVIEWS
//         </a>
//         {props.token && (
          
//           <p
//             className={styles.logout}
//             onClick={() => {
//               props.logOutUser();
//               showMenu();
//             }}
//           >
//             LOG OUT
//           </p>
//         )}
//         {!props.token && (
//           <NavLink to="/accounts" onClick={showMenu}>
//             <p>LOG IN/SIGN UP</p>
//           </NavLink>
//         )}
//         {props.token && <NavLink to='/friends'>FRIENDS!</NavLink>}
//       </nav>
//       <div className={styles.socialMediaResponsiveHeader}>
//         <SocialMediaFooterButton icon="instagram" />
//         <SocialMediaFooterButton icon="youtube" />
//         <SocialMediaFooterButton icon="discord" />
//         <SocialMediaFooterButton icon="twitter" />
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     token: state.users.token,
//     username: state.users.username,
//     avatar: state.users.avatar,
//     menu: state.other.menu,
//   };
// };

// const mapDispatchToProps = {
//   logOutUser: usersActions.logOutUser,
//   showMenuResponsive: otherActions.showMenu,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MenuResponsive);
