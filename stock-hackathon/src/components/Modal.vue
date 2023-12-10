<template>
  <div class="modal" v-if="isOpen" @click.self="closeModal">
    <div class="modal-content">
      <div class="close" @click="closeModal">✖</div>
      <h2>{{ titleText }}</h2>

      <!-- START Block for add and edit goods modal fields -->
      <div v-if="typeModal == 'addGoods' || typeModal == 'editGoods'">
        <div class="top-part">
          <div class="top-part__row">
            <div class="modal-content__el">
              <label>Артикул</label>
              <input
                type="text"
                v-model="artGood"
                @input="validateStr(artGood)"
                :class="isValidArt ? 'error' : ''"
              />
              <div class="error-block">
                <p v-if="isValidArt" class="error">{{ isValidArt }}</p>
              </div>
            </div>

            <div class="modal-content__el">
              <label>Название</label>
              <input
                type="text"
                v-model="nameGood"
                @input="validateStr(nameGood)"
                :class="isValidName ? 'error' : ''"
              />
              <div class="error-block">
                <p v-if="isValidName" class="error">{{ isValidName }}</p>
              </div>
            </div>
          </div>
          <div class="top-part__row">
            <div class="modal-content__el">
              <label>Цена, ₽</label>
              <input
                type="text"
                v-model="costGood"
                @input="validateNum(costGood)"
                :class="isValidCost ? 'error' : ''"
              />
              <div class="error-block">
                <p v-if="isValidCost" class="error">
                  {{ isValidCost }}
                </p>
              </div>
            </div>

            <div class="modal-content__el">
              <label>Штрих-код</label>
              <input
                type="text"
                v-model="barcodeGood"
                @input="validateNum(barcodeGood)"
                :class="isInvalidBarcode ? 'error' : ''"
              />
              <div class="error-block">
                <p v-if="isInvalidBarcode" class="error">
                  {{ isInvalidBarcode }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-content__el">
          <label>Описание</label>
          <textarea
            style="resize: none"
            type="text"
            v-model="descGood"
            @input="validateNonReq(descGood)"
            :class="isValidDesc ? 'error' : ''"
          />
          <div class="error-block">
            <p v-if="isValidDesc" class="error">{{ isValidDesc }}</p>
          </div>
        </div>

        <div class="modal-content__el last">
          <label>Габариты, см</label>
          <div class="size-wrapper">
            <input
              type="text"
              placeholder="Длина"
              v-model="lenGood"
              @input="validateNum(lenGood)"
              :class="isValidLen ? 'error' : ''"
            />
            <input
              type="text"
              placeholder="Высота"
              v-model="heightGood"
              @input="validateNum(heightGood)"
              :class="isValidHeight ? 'error' : ''"
            />
            <input
              type="text"
              placeholder="Ширина"
              v-model="widthGood"
              @input="validateNum(widthGood)"
              :class="isValidWidth ? 'error' : ''"
            />
          </div>
          <div class="error-block">
            <p v-if="isValidSize" class="error">{{ isValidSize }}</p>
          </div>

          <input
            type="text"
            placeholder="Количество"
            v-model="quantityGood"
            @input="validateNum(quantityGood)"
            :class="isValidQuantityGood ? 'error' : ''"
          />
          <div class="error-block">
            <p v-if="isValidQuantityGood" class="error">
              {{ isValidQuantityGood }}
            </p>
          </div>
        </div>
      </div>

      <!------ START Block for add and edit goods modal fields ------>
      <div v-if="typeModal == 'addImportReq'">
        <!-- modal content el for stock, hints and err -->
        <div class="modal-content__el">
          <label>Склад</label>
          <input
            type="text"
            @focus="handleInpStockFocus"
            @blur="handleInpStockBlur"
            placeholder="Начните вводить"
            v-model="nameStock"
            @input="validateStrSrchStock(handleSearchStock(nameStock))"
            :class="isValidNameStock ? 'error' : ''"
          />
          <div class="hints" v-if="filteredStocks.length && isInpStockFocused">
            <div
              class="hints_el"
              v-for="stock in filteredStocks"
              :key="stock"
              @click="fillSearchStock(stock)"
            >
              {{ stock }}
            </div>
          </div>
          <div class="error-block">
            <p v-if="isValidNameStock" class="error">{{ isValidNameStock }}</p>
          </div>
        </div>

        <!-- modal content el for goods, quantity, hints and err -->
        <div class="modal-content__el">
          <div class="goods-header">
            <label>Товар</label>
            <label>Количество</label>
          </div>
          <div class="scroll">
            <div class="goods__el" v-for="good in reqGoods" :key="good">
              <!-- good content for both inputs -->
              <div class="goods-content">
                <div>{{ reqGoods.indexOf(good) + 1 }}</div>
                <input
                  class="name"
                  type="text"
                  @blur="handleInpGoodBlur(reqGoods.indexOf(good))"
                  @focus="handleInpGoodFocus(reqGoods.indexOf(good))"
                  placeholder="Начните вводить"
                  v-model="good.nameGood"
                  @input="
                    validateStrSrchGood1(
                      // handleSearchGood(good.nameGood),
                      good.nameGood,
                      reqGoods.indexOf(good)
                    )
                  "
                  :class="good.err != '' ? 'error' : ''"
                />
                <input
                  class="num"
                  type="text"
                  v-model="good.quantityGood"
                  @input="
                    validateNum1(
                      good.quantityGood,
                      reqGoods.indexOf(good),
                      'err_quantity'
                    )
                  "
                  :class="good.err_quantity ? 'error' : ''"
                />
              </div>

              <!-- hints in another row -->
              <div
                class="hints"
                v-if="good.filteredGoods.length && good.isInpGoodFocused"
              >
                <div
                  class="hints_el"
                  v-for="goodhint in good.filteredGoods"
                  :key="goodhint"
                  @click="fillSearchGood(goodhint, reqGoods.indexOf(good))"
                >
                  {{ goodhint }}
                </div>
              </div>

              <!-- error block in another row -->
              <div class="error-block">
                <p v-if="good.err != ''" class="error">
                  {{ good.err }}
                </p>
                <p v-if="good.err_quantity != ''" class="error last">
                  {{ good.err_quantity }}
                </p>
              </div>
            </div>
            <div class="empty-space"></div>
          </div>
          <!-- btn add another goods -->
          <div class="add-btn">
            <button class="cancel-button" @click="addRowGoods">
              Добавить товар
            </button>
          </div>
        </div>
      </div>
      <!------ END Block for add and edit goods modal fields ------>

      <!------ Block for info  ------>
      <div v-if="typeModal == 'openImpReq'">
        <div class="modal-content__el">
          <div class="modal-row">
            <div class="modal-column">
              <label>Тип заявки</label>
              <div class="modal-column_text">Заявка на прием груза складом</div>
            </div>

            <div class="modal-column">
              <label>Продавец</label>
              <div class="modal-column_text">
                {{ filterdDataReqsImport[0].author }}
              </div>
            </div>

            <div class="modal-column">
              <label>Статус</label>
              <div class="modal-column_text">
                {{ filterdDataReqsImport[0].status }}
              </div>
            </div>
          </div>

          <div class="modal-row last">
            <div class="modal-column">
              <label>Дата созания</label>
              <div class="modal-column_text">
                {{ filterdDataReqsImport[0].date }}
              </div>
            </div>

            <div class="modal-column">
              <label>Склад</label>
              <div class="modal-column_text">
                {{ filterdDataReqsImport[0].stock }}
              </div>
            </div>
          </div>

          <div class="table">
            <div class="table__row header">
              <div class="table__el">Артикул</div>
              <div class="table__el">Наименование</div>
              <div class="table__el">Количество</div>
              <div class="table__el">Цена за единицу, ₽</div>
            </div>

            <div
              class="table__row"
              v-for="good in filterdDataReqsImport.goods"
              :key="good"
            >
              <div class="table__el">
                {{ good.ID }}
              </div>
              <div class="table__el">
                {{ good.name }}
              </div>
              <div class="table__el">
                {{ good.quantity }}
              </div>
              <div class="table__el">
                {{ good.cost }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="warning" v-if="typeModal == 'delGoods'">
        Вы действитетельно хотите удалить товар?
      </div>

      <div class="btn-wrapper">
        <button
          class="cancel-button"
          v-if="typeModal == 'delGoods'"
          @click="closeModal"
        >
          Отменить
        </button>

        <button
          class="cancel-button"
          v-if="typeModal == 'openImpReq'"
          @click="declineReqImport(dataReqsImport[0].ID)"
        >
          Отклонить
        </button>

        <button
          class="confirm-button"
          @click="confirmModal"
          :class="isValidToConfirm ? 'active' : ''"
        >
          {{ textConfirmBtn }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameGood: "",
      costGood: "",
      artGood: "",
      barcodeGood: "",
      descGood: "",
      lenGood: "",
      heightGood: "",
      widthGood: "",

      nameStock: "",
      isInpStockFocused: false,
      isInpGoodFocused: false,
      quantityGood: "",

      reqGoods: [
        {
          nameGood: "",
          quantityGood: "",
          isValidNameGood: false,
          err: "Обязательно для заполнения",
          err_quantity: "Обязательно для заполнения",
          filteredGoods: [],
          isInpGoodFocused: false,
          quantityGood: "",
        },
      ],
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    titleText: {
      type: String,
      default: "Модальное окно",
    },
    textConfirmBtn: {
      type: String,
      default: "Текст",
    },
    typeModal: {
      type: String,
      required: true,
    },
    dataStocks: {
      type: Array,
      dafault: [],
    },
    dataGoods: {
      type: Array,
      dafault: [],
    },
    dataReqsImport: {
      type: Array,
      dafault: [],
    },
    impReqGoodInf: {
      type: Array,
      dafault: [],
    },
    filterdDataReqsImport: {
      type: Array,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
      this.zeroFields();
    },
    handleInpStockFocus() {
      this.isInpStockFocused = true;
    },
    handleInpStockBlur() {
      setTimeout(() => {
        this.isInpStockFocused = false;
      }, 300);
    },
    handleInpGoodFocus(index) {
      this.reqGoods[index].filteredGoods = this.dataGoods;
      this.reqGoods[index].isInpGoodFocused = true;
    },
    handleInpGoodBlur(index) {
      setTimeout(() => {
        if (!this.dataGoods.includes(this.reqGoods[index].nameGood)) {
          if (this.reqGoods[index].nameGood != "") {
            this.reqGoods[index].err = "У вас нет такого товара";
          }
        } else {
          this.reqGoods[index].err = "";
        }
        this.reqGoods[index].isInpGoodFocused = false;
      }, 300);
    },
    declineReqImport(ID) {
      // console.log(ID);
      this.closeModal();
    },
    confirmModal() {
      switch (this.typeModal) {
        case "delGoods":
          this.$emit("confirmModal", {
            method: "del",
          });
          break;
        case "editGoods":
          this.$emit("confirmModal", {
            method: "edit",
            data: {
              artGood: this.artGood,
              nameGood: this.nameGood,
              costGood: this.costGood,
              barcodeGood: this.barcodeGood,
              descGood: this.descGood,
              lenGood: this.lenGood,
              heightGood: this.heightGood,
              widthGood: this.widthGood,
              quantityGood: this.quantityGood,
            },
          });
          break;
        case "addGoods":
          this.$emit("confirmModal", {
            method: "add",
            data: {
              artGood: this.artGood,
              nameGood: this.nameGood,
              costGood: this.costGood,
              barcodeGood: this.barcodeGood,
              descGood: this.descGood,
              lenGood: this.lenGood,
              heightGood: this.heightGood,
              widthGood: this.widthGood,
              quantityGood: this.quantityGood,
            },
          });
          break;
        case "addImportReq":
          let currentDate = new Date();

          let day = String(currentDate.getDate()).padStart(2, "0");
          let month = String(currentDate.getMonth() + 1).padStart(2, "0");
          let year = currentDate.getFullYear();

          let hours = String(currentDate.getHours()).padStart(2, "0");
          let minutes = String(currentDate.getMinutes()).padStart(2, "0");
          let seconds = String(currentDate.getSeconds()).padStart(2, "0");

          let formattedDate = `${day}:${month}:${year} ${hours}:${minutes}:${seconds}`;
          // console.log(formattedDate);

          this.$emit("confirmModal", {
            method: "addReq",
            data: {
              // ID: "ID-example-854",
              status: "Создана",
              author: "ИП Иванов Иван Иванович",
              stock: this.nameStock,
              date: formattedDate,
              sum: "1000",
            },
          });
          break;
        case "openImpReq":
          console.log("ffffffff");
          this.$emit("confirmModal", {
            method: "openReq",
            data: {
              // ID: "ID-example-854",
              status: "Создана",
              author: "ИП Иванов Иван Иванович",
              stock: this.nameStock,
              date: formattedDate,
              sum: "1000",
            },
          });
          break;
      }
      this.closeModal();
    },
    validateNum1(inp, index, field_name) {
      if (!inp) {
        this.reqGoods[index][field_name] = "Обязательно для заполнения";
      } else if (inp.length > 7) {
        this.reqGoods[index][field_name] =
          "Слишком длинное число. Максимальная длина: 7 цифр";
      } else if (!/^[0-9\s]+$/.test(inp)) {
        this.reqGoods[index][field_name] =
          "Не должно содержать специальных символов или букв";
      } else {
        this.reqGoods[index][field_name] = "";
      }
    },
    validateNum(inp) {
      if (!inp) {
        return "Обязательно для заполнения";
      } else if (inp.length > 7) {
        return "Слишком длинное число. Максимальная длина: 7 цифр";
      } else if (!/^[0-9\s]+$/.test(inp)) {
        return "Не должно содержать специальных символов или букв";
      } else {
        return "";
      }
    },
    validateStr(inp) {
      if (!inp) {
        return "Обязательно для заполнения";
      } else if (inp.length > 20) {
        return "Слишком длинная строка. Максимальная длина: 20 символов";
      } else if (!/^[A-zА-я0-9]+$/.test(inp)) {
        return "Не должно содержать специальных символов";
      } else {
        return "";
      }
    },
    validateNonReq(inp) {
      if (inp.length > 100) {
        return "Слишком длинная строка. Максимальная длина: 100 символов";
      } else if (!/^[A-zА-я0-9]+$/.test(inp) && inp != "") {
        return "Не должно содержать специальных символов";
      } else {
        return "";
      }
    },
    validateStrSrchStock(inp) {
      if (!inp) {
        return "Обязательно для заполнения";
      } else if (inp.length > 20) {
        return "Слишком длинная строка. Максимальная длина: 20 символов";
      } else if (!/^[A-zА-я0-9]+$/.test(inp)) {
        return "Не должно содержать специальных символов";
      } else if (
        this.filteredStocks.length == 0 ||
        (!this.isInpStockFocused && !this.dataStocks.includes(this.nameStock))
      ) {
        return "Такого склада у нас нет ";
      } else {
        return "";
      }
    },
    validateStrSrchGood1(inp, index) {
      this.reqGoods[index].filteredGoods = this.dataGoods
        .filter((good) =>
          good
            .toLowerCase()
            .includes(this.reqGoods[index].nameGood.trim().toLowerCase())
        )
        .slice(0, 4);
      if (!inp) {
        this.reqGoods[index].err = "Обязательно для заполнения";
      } else if (inp.length > 20) {
        this.reqGoods[index].err =
          "Слишком длинная строка. Максимальная длина: 20 символов";
      } else if (!/^[A-zА-я0-9]+$/.test(inp)) {
        this.reqGoods[index].err = "Не должно содержать специальных символов";
      } else if (
        this.reqGoods[index].filteredGoods.length == 0 ||
        (!this.reqGoods[index].isInpGoodFocused &&
          !this.dataGoods.includes(this.reqGoods[index].nameGood))
      ) {
        this.reqGoods[index].err = "Такого товара нет у вас";
      } else {
        this.reqGoods[index].err = "";
      }
    },
    addRowGoods() {
      this.reqGoods.push({
        nameGood: "",
        quantityGood: "",
        isValidNameGood: false,
        err: "Обязательно для заполнения",
        err_quantity: "Обязательно для заполнения",
        filteredGoods: [],
        isInpGoodFocused: false,
        quantityGood: "",
      });
    },
    zeroFields() {
      this.nameGood = "";
      this.costGood = "";
      this.artGood = "";
      this.barcodeGood = "";
      this.descGood = "";
      this.lenGood = "";
      this.heightGood = "";
      this.widthGood = "";
      this.CounterRowsGoods = 0;
    },
    handleSearchStock(event) {
      this.filteredStocks = [];
    },
    fillSearchStock(stock) {
      this.nameStock = stock;
      this.filteredStocks = [];
    },
    handleSearchGood(event) {
      this.filteredGoods = [];
    },
    fillSearchGood(good, index) {
      this.reqGoods[index].nameGood = good;
      this.reqGoods[index].filteredGoods = [];
    },
  },
  computed: {
    filteredStocks() {
      return this.dataStocks
        .filter((stock) =>
          stock.toLowerCase().includes(this.nameStock.trim().toLowerCase())
        )
        .slice(0, 4);
    },
    filteredGoods() {
      return this.dataGoods
        .filter((good) =>
          good.toLowerCase().includes(this.nameGood.trim().toLowerCase())
        )
        .slice(0, 4);
    },

    isInvalidBarcode() {
      return this.validateNum(this.barcodeGood);
    },
    isValidCost() {
      return this.validateNum(this.costGood);
    },
    isValidName() {
      return this.validateStr(this.nameGood);
    },
    isValidArt() {
      return this.validateStr(this.artGood);
    },
    isValidDesc() {
      return this.validateNonReq(this.descGood);
    },
    isValidLen() {
      return this.validateNum(this.lenGood);
    },
    isValidHeight() {
      return this.validateNum(this.heightGood);
    },
    isValidWidth() {
      return this.validateNum(this.widthGood);
    },
    isValidNameStock() {
      return this.validateStrSrchStock(this.nameStock);
    },
    isValidQuantityGood() {
      return this.validateNum(this.quantityGood);
    },
    isValidSize() {
      return this.isValidHeight || this.isValidWidth || this.isValidLen;
    },
    isValidToConfirm() {
      if (this.typeModal == "editGoods") {
        return (
          this.isValidArt == "" &&
          this.isValidName == "" &&
          this.isValidCost == "" &&
          this.isInvalidBarcode == "" &&
          this.isValidDesc == "" &&
          this.isValidLen == "" &&
          this.isValidHeight == "" &&
          this.isValidWidth == ""
        );
      } else if (this.typeModal == "addGoods") {
        return (
          this.isValidArt == "" &&
          this.isValidName == "" &&
          this.isValidCost == "" &&
          this.isInvalidBarcode == "" &&
          this.isValidDesc == "" &&
          this.isValidLen == "" &&
          this.isValidHeight == "" &&
          this.isValidWidth == "" &&
          this.isValidCost == ""
        );
      } else if (this.typeModal == "addImportReq") {
        var isValidGoodsAndQual = true;
        this.reqGoods.forEach((el) => {
          if (el.err != "" || el.err_quantity != "") {
            isValidGoodsAndQual = false;
          }
        });
        return this.isValidNameStock == "" && isValidGoodsAndQual;
      } else if (
        this.typeModal == "delGoods" ||
        this.typeModal == "openImpReq"
      ) {
        return true;
      } else {
        return (
          this.isInvalidBarcode == "" &&
          this.isValidName == "" &&
          this.isValidCost == "" &&
          this.isValidDesc == "" &&
          this.isValidArt == "" &&
          this.isValidLen == "" &&
          this.isValidHeight == ""
        );
      }
    },
  },
};
</script>

<style lang="scss">
.error {
  color: red;
  font-size: 1vw;
  &.last {
    margin-left: auto;
  }
  &-block {
    height: 1vw;
    display: flex;
  }
}
.empty-space {
  height: 7vw;
}
.modal {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &-content {
    background-color: white;
    width: 60%;
    min-height: 55%;
    padding: 2.5vw;
    border-radius: 5px;
    position: relative;

    .table {
      &__row {
        display: flex;
        justify-content: start;
        &.header {
          font-weight: bold;
          margin-bottom: 1vw;
        }
      }
      &__el {
        width: 15vw;
      }
    }
    .scroll {
      overflow: scroll;
      height: 14vw;
      padding-right: 1vw;
      overflow-x: hidden;
    }

    .warning {
      margin-bottom: 5vw;
      font-size: 1.4vw;
    }
    .btn-wrapper {
      display: flex;
      justify-content: space-between;
      position: absolute;
      right: 1rem;
      bottom: 1rem;
      gap: 1vw;
    }
    .top-part {
      display: flex;
      flex-direction: column;
      gap: 1.3vw;
      margin-bottom: 1vw;
      &__row {
        gap: 1.7vw;
        display: flex;
        justify-content: space-between;
      }
    }
    h2 {
      font-size: 2vw;
      margin-bottom: 1vw;
    }
    .add-btn {
      display: flex;
      justify-content: end;
      margin-bottom: 5vw;
    }

    .goods {
      &-header {
        display: flex;
        justify-content: space-between;
        padding-right: 11%;
        // margin-bottom: 1vw;
      }
      &__el {
        margin-bottom: 1vw;
        position: relative;
      }
      &-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.4vw;
        gap: 1vw;

        input {
          &.num {
            width: 30%;
          }
          &.name {
            width: 100%;
          }
        }
      }
      button {
        position: absolute;
        right: 5vw;
        font-size: 2vw;
        background-color: var(--grey);
        color: white;
        border-radius: 0.5vw;
        padding: 0.2vw 0.8vw;
        cursor: pointer;
      }
    }
    .hints {
      display: flex;
      gap: 0.1vw;
      position: absolute;
      // overflow: hidden;
      top: 3vw;
      z-index: 100;
      flex-direction: column;
      &_el {
        background-color: var(--extra_light_grey);
        padding: 0.4vw 1vw;
        border-radius: 0.2vw;
        cursor: pointer;

        &:hover {
          background-color: var(--light);
        }
      }
    }
    &__el {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.4vw;
      margin-bottom: 1vw;
      position: relative;

      .modal-row {
        display: flex;
        padding-right: 5vw;
        justify-content: space-between;
        gap: 2vw;
        margin-bottom: 2vw;

        .modal-column_text {
          font-size: 1.2vw;
          font-weight: bold;
        }
        label {
          font-size: 1.1vw;
        }

        &.last {
          gap: 14vw;
          justify-content: start;
        }
      }

      &.last {
        width: calc(50% - 1vw);
        .size-wrapper {
          display: flex;
          gap: 0.5vw;
          justify-content: space-between;

          input {
            width: 100%;
          }
        }
      }
    }
    label {
      font-size: 1.1vw;
    }
    input,
    textarea {
      outline: none;
      padding: 0.5vw;
      font-size: 1.1vw;
      border-radius: 0.4vw;
      border: 2px solid var(--light);
    }
    .close {
      font-stretch: expanded;
      font-size: 1vw;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      font-size: 20px;
      color: var(--light-grey);
    }
  }
  .cancel-button {
    padding: 1vw 2vw;
    cursor: pointer;
    border-radius: 0.5vw;
    transition: 0.2s ease-out;
    color: white;
    border: none;
    background-color: var(--grey);
    transform: none;
  }
  .confirm-button {
    background-color: var(--light-grey);
    padding: 1vw 2vw;
    cursor: pointer;
    border-radius: 0.5vw;
    transition: 0.2s ease-out;
    color: var(--grey);
    border: 1px solid black;
    pointer-events: none;

    &.active {
      pointer-events: all;
      border: none;
      background-color: var(--primary);
      transform: none;
      color: white;

      &:hover {
        transform: translate(0.2vw, -0.2vw);
        transition: 0.2s ease-out;
      }
    }
  }
}
</style>
