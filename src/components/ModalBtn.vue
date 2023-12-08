<template>
  <div class="modal-btn-wrapper">
    <h2>{{ getTitle }}</h2>
    <div class="modal-btn" @click="openModal">{{ text_btn }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeModal: "",
      title: "",
    };
  },
  props: {
    text_btn: {
      type: String,
      required: true,
    },
  },
  methods: {
    openModal() {
      switch (this.$route.path) {
        case "/stock":
          this.typeModal = "addGoods";
          this.title = "Товары";
          break;
        case "/import":
          this.typeModal = "addImportReq";
          this.title = "Доставка на склад";
          break;
      }
      this.$emit("openModal", this.typeModal);
    },
  },
  computed: {
    getTitle() {
      switch (this.$route.path) {
        case "/stock":
          return "Товары";
        case "/import":
          return "Доставка на склад";
      }
    },
  },
};
</script>

<style lang="scss">
.modal-btn-wrapper {
  margin-top: 1vw;
  display: flex;
}
.modal-btn {
  margin-left: auto;
  cursor: pointer;
  background-color: var(--primary);
  color: white;
  border-radius: 0.4vw;
  padding: 0.5vw 2vw;
  transition: 0.2s ease-out;
  font-size: 1.2vw;

  &:hover {
    background-color: white;
    color: var(--primary);
    transition: 0.2s ease-out;
  }
}
</style>
