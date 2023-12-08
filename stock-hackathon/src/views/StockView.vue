<template>
  <div class="stock-wrapper">
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
          id: "ID-example-856",
          name: "Наушники Samsung",
          ras: "NK676XCGUD",
          vol: "0,002",
          weight: "0,04",
          cost: "899",
          quantity: "800",
        },
        {
          id: "ID-example-857",
          name: "Наушники Samsung",
          ras: "NK676XCGUD",
          vol: "0,002",
          weight: "0,04",
          cost: "899",
          quantity: "800",
        },
      ],
      typeTable: "extended",
      headers: [
        "ID",
        "Название",
        "Артикул",
        "Объем",
        "Вес",
        "Цена",
        "Количество",
      ],
    };
  },
  methods: {
    openModal(args) {
      this.$emit("openModal", args);
    },
  },
  created() {
    this.$emit("onCreateStock");
  },
};
</script>

<style scoped></style>
