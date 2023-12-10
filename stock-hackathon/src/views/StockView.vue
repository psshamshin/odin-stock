<template>
  <div class="stock-wrapper">
    <Table
      :headers="headersGoods"
      :data="dataGoods"
      @openModal="openModal"
      :typeTable="typeTable"
    />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import axios from "axios";

export default {
  components: {
    Table,
  },
  data() {
    return {
      typeTable: "extended",
    };
  },
  props: {
    dataGoods: {
      type: Array,
      required: true,
    },
    headersGoods: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openModal(args) {
      this.$emit("openModal", args);
    },
    async getGoods() {
      // const axios = require("axios");
      let data = "";

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.odinstock.ru/products/getByClientId?clientId=1",
        headers: {
          "Content-Type": "application/json",
          //   Authorization:
          //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMSIsImV4cCI6MTcwMjEzMjc5MiwiaXNzIjoiU3RvY2sgU2VydmVyIiwiYXVkIjoiU2VydmljZSBDbGllbnQifQ.3b4LVpl0IsjSPunizS_IjoyAk8ra-ZZQTskLuhwY7yg",
          //
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.$emit("onCreateStock");
    // this.getGoods();
  },
};
</script>

<style scoped></style>
