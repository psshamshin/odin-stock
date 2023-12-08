<template>
  <div class="table">
    <div class="table-head">
      <div v-for="el in headers" :key="el" class="table-head__el">
        {{ el }}
      </div>
    </div>
    <div class="table-body">
      <div v-for="el in data" :key="el" class="table-body-row">
        <div class="table-body-row__el" v-for="(value, key) in el" :key="key">
          {{ value }}
        </div>
        <div class="btns-block">
          <button
            class="edit-btn"
            v-if="typeTable != 'simple'"
            @click="openModal('editGoods_' + el.id)"
          >
            <img src="../assets/edit_icon.svg" alt="edit" />
          </button>
          <button
            class="del-btn"
            v-if="typeTable != 'simple'"
            @click="openModal('delGoods_' + el.id)"
          >
            <img src="../assets/delete_icon.svg" alt="del" />
          </button>

          <button
            class="del-btn"
            v-if="typeTable == 'simple'"
            @click="openModal('openImpReq')"
          >
            <img src="../assets/open_icon.svg" alt="del" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    typeTable: {
      type: String,
      required: true,
    },
  },
  methods: {
    openModal(args) {
      this.$emit("openModal", args);
    },
  },
};
</script>

<style lang="scss">
.table {
  padding-top: 4vw;
  width: 100%;
  font-size: 1.1vw;

  &-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.7vw;
    padding-right: 8.5vw;
    padding-top: 1vw;

    &__el {
      width: 100%;
      text-align: center;
    }
  }
  &-body {
    display: flex;
    flex-direction: column;
    gap: 0.7vw;
    justify-content: start;

    &-row {
      display: flex;
      align-items: center;
      height: 7vw;
      justify-content: space-between;
      background-color: white;
      padding: 1vw;
      border-radius: 0.5vw;
      gap: 2vw;

      &__el {
        width: 100%;
        text-align: center;
      }
      .btns-block {
        display: flex;
        justify-content: space-between;
        gap: 0.5vw;

        button {
          width: 3vw;
          height: 4vw;
          cursor: pointer;
          border-radius: 0.5vw;
          transition: all 0.3s ease-out;

          &:hover {
            transition: all 0.3s ease-out;
            box-shadow: 0.2vw 0.2vw 0.8vw 0px rgba(0, 0, 0, 0.25);
          }
          img {
            width: 1.4vw;
          }
        }
      }
    }
  }
}
</style>
