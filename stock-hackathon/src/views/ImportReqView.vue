<template>
  <div class="import_req-wrapper">
    <Table
      :headers="headers"
      :data="dataReqsImport"
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
      typeTable: "simple",
      headers: ["ID", "Статус", "Автор", "Склад", "Дата создания", "Сумма, ₽"],
    };
  },
  props: {
    dataReqsImport: {
      type: Array,
      required: true,
    },
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
