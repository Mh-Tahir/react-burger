import React, { useEffect, FC } from "react";
import styles from "./app.module.css"; //eslint-disable-line
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useDispatch } from "react-redux";
import { getData } from "../../services/actions";
import Main from "../pages/main";
import Profile from "../pages/profile";
import Login from "../pages/login";
import Register from "../pages/register";
import ForgotPassword from "../pages/forgot-password";
import ResetPassword from "../pages/reset-password";
import Error404 from "../pages/error-404";
import Orders from "../pages/orders";
import Order from "../pages/order";
import Feed from "../pages/feed";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import ProtectedRoute from "../protected-route";
import LoginProtectedRoute from "../protected-route/login-protected";
import { SIGN_IN } from "../../services/actions";

const App: FC = () => {
  const location = useLocation();
  const history = useHistory<History>();
  const dispatch = useDispatch();
  let background =
    (history.action === "PUSH" || history.action === "REPLACE") && location.state && location.state.background;
  const signIn = localStorage.getItem("refreshToken");

  useEffect(() => {
    dispatch(getData());
    if (signIn) {
      dispatch({ type: SIGN_IN });
    }
  }, [dispatch, signIn]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <Main />
        </Route>
        <LoginProtectedRoute path="/register" exact>
          <Register />
        </LoginProtectedRoute>
        <LoginProtectedRoute path="/login" exact>
          <Login />
        </LoginProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientDetails />
        </Route>
        <LoginProtectedRoute path="/reset-password" exact>
          <ResetPassword />
        </LoginProtectedRoute>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <Orders />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <Order />
        </ProtectedRoute>
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact>
          <Order />
        </Route>
        <LoginProtectedRoute path="/forgot-password" exact>
          <ForgotPassword />
        </LoginProtectedRoute>
        <Route>
          <Error404 />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal onClose={() => history.goBack()}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/feed/:id">
          <Modal onClose={() => history.goBack()}>
            <Order />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:id">
          <Modal onClose={() => history.goBack()}>
            <Order />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default App;
