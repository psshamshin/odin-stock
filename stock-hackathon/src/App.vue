<template>
  <div class="app">
    <Menu v-if="isLogedIn" />
    <div class="container">
      <Profile
        v-if="isLogedIn"
        :name="userName"
        :role="userRole"
        @logOut="logOut"
      />
      <ModalBtn
        v-if="isLogedIn"
        :text_btn="textBtnModal"
        @openModal="openModal"
      />
      <RouterView
        @onCreateStock="onCreateStock"
        @onCreateImportReq="onCreateImportReq"
        @signIn="signIn"
        @openModal="openModal"
      />

      <Modal
        :isOpen="isOpenModal"
        :typeModal="typeModal"
        @closeModal="closeModal"
        @confirmModal="confirmModal"
        :titleText="titleTextModal"
        :textConfirmBtn="textConfirmBtnModal"
        :dataStocks="dataStocks"
        :dataGoods="dataGoods"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Menu from "@/components/Menu.vue";
import Profile from "@/components/Profile.vue";
import ModalBtn from "@/components/ModalBtn.vue";
import Modal from "@/components/Modal.vue";

export default {
  data() {
    return {
      userRole: "",
      userName: "",
      textBtnModal: "",
      isOpenModal: false,
      typeModal: "",
      isLogedIn: false,
      titleTextModal: "",
      textConfirmBtnModal: "Подтвердить",
      dataStocks: ["Озон", "WB", "Озон5"],
      dataGoods: ["Мячик", "Наушники", "Ноутбук", "четоеще"],
      idElement: "",
    };
  },
  components: {
    Menu,
    Profile,
    ModalBtn,
    Modal,
  },
  methods: {
    openModal(args) {
      this.idElement = args.split("_")[1];
      // console.log(this.idElement);

      this.isOpenModal = true;
      this.typeModal = args.split("_")[0];
      switch (this.typeModal) {
        case "editGoods":
          this.titleTextModal = "Редактирование товара";
          break;
        case "addGoods":
          this.titleTextModal = "Добавление товара";
          break;
        case "delGoods":
          this.titleTextModal = "Удаление товара";
          break;
        case "addImportReq":
          this.titleTextModal = "Создание заявки";
          break;
        case "openImpReq":
          this.titleTextModal = "Просмотр заявки на загрузку";
          break;
      }
    },
    confirmModal(form_data) {
      console.log(this.idElement + " " + form_data.method);
      if (form_data.data) {
        console.log(form_data.data);
      }
      this.idElement = "";
    },
    closeModal() {
      this.isOpenModal = false;
    },
    async signIn(data) {
      // console.log(data.userName + " " + data.userRole);
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        "https://mgimoapp.ru/auth/login?username=" +
          data.userName +
          "&password=" +
          data.userPass,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          // result.json();
          result = JSON.parse(result);

          sessionStorage.setItem("userName", data.userName);
          sessionStorage.setItem("userRole", result.role);

          this.$router.replace("/stock");

          this.userName = sessionStorage.getItem("userName");
          this.userRole = sessionStorage.getItem("userRole");
          console.log(this.userName + " " + this.userRole);

          this.isLogedIn = true;
        })
        .catch((error) => console.log("error", error));
    },
    logOut() {
      console.log("logout");
      this.$router.replace("/auth");
      sessionStorage.clear();
      this.isLogedIn = false;
    },

    //==== Metods for init modal button text ====
    onCreateStock() {
      this.textBtnModal = "Добавть товар";
    },
    onCreateImportReq() {
      this.textBtnModal = "Создать заявку";
    },
  },
  computed: {},
  mounted() {
    if (sessionStorage.getItem("userName")) {
      this.isLogedIn = true;
      this.userName = sessionStorage.getItem("userName");
      this.userRole = sessionStorage.getItem("userRole");
    } else {
      this.logOut;
    }
  },
};
</script>

<style lang="scss">
:root {
  --light: #dddddd;
  --primary: #a256bd;
  --primary_dark: #8a44a3;
  --grey: #333333;
  --light_grey: #989898;
  --extra_light_grey: #e1e1e1;
  // --semilight_grey: #5c5c5c;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

body {
  background-color: var(--light);
}

button {
  outline: none;
  appearance: none;
  border: none;
  background: none;
}

.container {
  margin-left: 15%;
  margin-right: 2vw;
}
</style>
