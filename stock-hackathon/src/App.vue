<template>
  <div class="app">
    <Menu v-if="isLogedIn" />
    <div class="container" :class="{ special: isLandingPage }">
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
        :dataGoods="dataGoodsTable"
        :headersGoods="headersGoods"
        :dataReqsImport="dataReqsImport"
      />

      <Modal
        :isOpen="isOpenModal"
        :typeModal="typeModal"
        @closeModal="closeModal"
        @confirmModal="confirmModal"
        :titleText="titleTextModal"
        :textConfirmBtn="textConfirmBtnModal"
        :dataStocks="dataStocks"
        :dataGoods="DataGoodsNames"
        :dataReqsImport="dataReqsImport"
        :impReqGoodInf="impReqGoodInf"
        :filterdDataReqsImport="filterdDataReqsImport"
      />
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import Profile from "@/components/Profile.vue";
import ModalBtn from "@/components/ModalBtn.vue";
import Modal from "@/components/Modal.vue";

// import axios from "axios";

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
      dataStocks: ["Озон", "WB", "Яндекс маркет"],
      // dataGoods: ["Мячик", "Наушники", "Ноутбук", "четоеще"],
      idElement: "",

      headersGoods: [
        "ID",
        "Название",
        "Артикул",
        "Объем, м3",
        "Вес",
        "Цена, Р",
        "Количество",
      ],
      dataGoodsTable: [
        {
          id: "ID-example-856",
          name: "Наушники Samsung",
          ras: "NK676XCGUD",
          vol: "0.002",
          weight: "0.04",
          cost: "899",
          quantity: "800",
        },
        {
          id: "ID-example-857",
          name: "Наушники Apple",
          ras: "NK676XCGUD",
          vol: "0.002",
          weight: "0.04",
          cost: "1899",
          quantity: "800",
          // barcode: "1212121",
        },
      ],
      dataReqsImport: [
        {
          ID: "ID-example-854",
          status: "Создана",
          author: "ИП Иванов Иван Иванович",
          stock: "Озон",
          date: "02.12.2023 12:45:34",
          sum: "1000",
          // goods: [
          //   {
          //     ID: "ID-example-856",
          //     name: "Наушники Samsung",
          //     quantity: "100",
          //     cost: "899",
          //   },
          //   {
          //     ID: "ID-example-856",
          //     name: "Наушники Apple",
          //     quantity: "100",
          //     cost: "1899",
          //   },
          // ],
        },
      ],

      impReqGoodInf: [
        {
          ID: "ID-example-856",
          name: "Наушники Samsung",
          quantity: "100",
          cost: "899",
        },
        {
          ID: "ID-example-857",
          name: "Наушники Samsung 2",
          quantity: "19",
          cost: "1899",
        },
      ],
      filterdDataReqsImport: [],
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
      console.log(this.idElement);

      this.isOpenModal = true;
      this.typeModal = args.split("_")[0];
      // console.log(this.typeModal);

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
          //get user goods by id req
          // console.log("ggg");
          this.titleTextModal = "Просмотр заявки на загрузку";
          break;
      }
    },
    confirmModal(form_data) {
      console.log(this.idElement + " " + form_data.method);
      if (form_data.data) {
        console.log(form_data.data);
      }
      switch (form_data.method) {
        case "add":
          var ID = this.dataGoodsTable[this.dataGoodsTable.length - 1]["id"];
          var lastChar = ID.charAt(ID.length - 1);
          let lastNumber = parseInt(lastChar, 10);
          lastNumber++;
          console.log(ID.slice(0, -1) + lastNumber);

          this.dataGoodsTable.push({
            ID: D.slice(0, -1) + lastNumber,
            name: form_data.data.nameGood,
            ras: form_data.data.artGood,
            vol:
              ((((parseInt(form_data.data.widthGood, 10) / 100) *
                parseInt(form_data.data.heightGood, 10)) /
                100) *
                parseInt(form_data.data.quantityGood, 10)) /
              100,
            weight: "0,04",
            cost: form_data.data.costGood,
            quantity: form_data.data.quantityGood,
          });

          break;
        case "del":
          console.log(this.idElement);

          for (let i = 0; i < this.dataGoodsTable.length; i++) {
            if (this.dataGoodsTable[i]["id"] === this.idElement) {
              console.log(this.dataGoodsTable[i]);
              this.dataGoodsTable.splice(i, 1);
              break;
            }
          }
          break;
        case "addReq":
          var ID = this.dataReqsImport[this.dataReqsImport.length - 1]["ID"];
          var lastChar = ID.charAt(ID.length - 1);
          let lastNumber1 = parseInt(lastChar, 10);
          lastNumber1++;

          this.dataReqsImport.push({
            ID: ID.slice(0, -1) + lastNumber1,
            status: "Создана",
            author: "ИП Иванов Иван Иванович",
            stock: form_data.data.stock,
            date: form_data.data.date,
            sum: "1000",
          });
          break;
        case "openReq":
          this.filterdDataReqsImport = this.dataReqsImport.filter(
            (el) => el.ID == this.idElement
          );
          console.log(this.filterdDataReqsImport);
          break;
      }

      this.idElement = "";
    },
    closeModal() {
      this.isOpenModal = false;
    },
    async signIn(data) {
      if (data.userName == "siquell" && data.userPass == "qwerty123") {
        var result = { role: "Admin" };
        sessionStorage.setItem("userName", data.userName);
        sessionStorage.setItem("userRole", result.role);

        this.$router.replace("/stock");

        this.userName = sessionStorage.getItem("userName");
        this.userRole = sessionStorage.getItem("userRole");
        console.log(this.userName + " " + this.userRole);

        this.isLogedIn = true;
      }
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
  computed: {
    isLandingPage() {
      return this.$route.path === "/";
    },
    filteredTabelGood() {
      return this.dataGoodsTable.filter();
    },
    DataGoodsNames() {
      return this.dataGoodsTable.map((el) => el.name);
    },
    filterdDataReqsImport() {
      return this.dataReqsImport.filter((el) => el.ID == this.idElement);
    },
  },
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
.special {
  margin: 0;
}
</style>
