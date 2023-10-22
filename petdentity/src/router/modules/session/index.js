import SessionLayout from "@/layouts/session/SessionLayout.vue";

export const session = {
  path: "/session",
  component: SessionLayout,
  children: [
    {
      path: "login",
      name: "SessionLogin",
      component: () => import("@/views/session/login/LoginView.vue"),
      meta: { authenticated: false },
    },
    {
      path: "forgot",
      name: "SessionForgot",
      component: () => import("@/views/session/forgot/ForgotView.vue"),
      meta: { authenticated: false },
    },
    {
      path: "signup",
      name: "SessionSignup",
      component: () => import("@/views/session/signup/SignupView.vue"),
      meta: { authenticated: false },
    },
  ],
};
