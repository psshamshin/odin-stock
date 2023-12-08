<template>
  <div class="auth">
    <div class="auth-content">
      <div class="logo">
        <img src="../assets/logo_dark.svg" alt="Logo" />
        <div class="label">Stock</div>
      </div>

      <div class="auth-content__el">
        <label>Имя пользователя siquell</label>
        <input
          type="text"
          v-model="userName"
          @input="validateUserName"
          :class="userNameError ? 'error' : ''"
        />
        <p v-if="userNameError" class="error">{{ userNameError }}</p>
      </div>

      <div class="auth-content__el">
        <label>Пароль qwerty123</label>
        <input
          type="text"
          v-model="userPass"
          @input="validateUserPass"
          :class="userPassError ? 'error' : ''"
        />
        <p v-if="userPassError" class="error">{{ userPassError }}</p>
      </div>

      <div
        class="sign-in"
        @click="signIn"
        :class="
          userNameError == '' && userPassError == '' && userName && userPass
            ? 'active'
            : ''
        "
      >
        Войти
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      userPass: "",
      userNameError: "",
      userPassError: "",
    };
  },
  methods: {
    signIn() {
      if ((this.userPassError == "" && this.userNameError) == "")
        this.$emit("signIn", {
          userName: this.userName,
          userPass: this.userPass,
          userRole: "Admin",
        });
    },
    validateUserName() {
      if (!this.userName) {
        this.userNameError = "Обязательно для заполнения";
      } else if (this.userName.length > 20) {
        this.userNameError =
          "Слишком длинное имя. Максимальная длина: 20 символов";
      } else if (this.userName.length < 2) {
        this.userNameError =
          "Слишком короткое имя. Минимальная длина: 2 символа";
      } else if (!/^[A-zА-ю0-9]+$/.test(this.userName)) {
        this.userNameError = "Не должно содержать специальных символов";
      } else {
        this.userNameError = "";
      }
    },
    validateUserPass() {
      const specialCharacterRegex = /[!@#$%^&*();,.<>?/\\|_+~=]/;
      const numberRegex = /\d/;
      /*
      if (
        specialCharacterRegex.test(this.userPass) &&
        numberRegex.test(this.userPass)
      ) {
        this.userPassError = "";
      } else {
        this.userPassError = "Должен содержать специальные символы и цифры";
      }
      */
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
}
.auth {
  &-content {
    background-color: white;
    width: 40%;
    padding: 3vw;
    border-radius: 5px;
    position: absolute;
    top: 25%;
    left: 30%;

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1vw;
      margin: 1vw 1vw 5vw 1vw;

      img {
        width: 3vw;
      }
      .label {
        font-size: 2vw;
        font-weight: bold;
        color: var(--grey);
      }
    }

    &__el {
      margin-bottom: 1.2vw;
      display: flex;
      flex-direction: column;
      gap: 0.5vw;

      label {
        font-size: 1.2vw;
      }

      input {
        padding: 0.5vw;
        font-size: 1.1vw;
        border-radius: 0.4vw;
        border: 2px solid var(--light);
      }
    }
    .sign-in {
      width: 100%;
      padding: 0.5vw;
      text-align: center;
      background-color: var(--light_grey);
      border-radius: 0.4vw;
      color: white;
      font-size: 1.1vw;
      pointer-events: none;

      &.active {
        cursor: pointer;

        pointer-events: all;
        border: none;
        background-color: var(--primary);
        transform: none;
        color: white;

        &:hover {
          background-color: var(--primary_dark);
        }
      }
    }
  }
}
</style>
