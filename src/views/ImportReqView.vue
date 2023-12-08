<template>
  <div class="import_req-wrapper">
    <Table
      :headers="headers"
      :data="data"
      @openModal="openModal"
      :typeTable="typeTable"
    />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";

export default {
  components: {
    Table,
  },
  data() {
    return {
      data: [
        {
          id: "ID-example-854",
          status: "Создана",
          author: "ИП Иванов Иван Иванович",
          stock: "Склад",
          datetime: "02.12.2023 12:45:34",
          cost: "1000",
        },
        {
          id: "ID-example-855",
          status: "Создана",
          author: "ИП Иванов Иван Иванович",
          stock: "Склад",
          datetime: "02.12.2023 12:45:34",
          cost: "1000",
        },
      ],
      typeTable: "simple",
      headers: ["ID", "Статус", "Автор", "Склад", "Дата создания", "Сумма, ₽ "],
    };
  },
  methods: {
    openModal(args) {
      this.$emit("openModal", args);
    },
  },
  created() {
    this.$emit("onCreateImportReq");
  },
};
</script>

<style></style>
