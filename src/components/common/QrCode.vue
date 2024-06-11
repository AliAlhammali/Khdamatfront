<template>
  <v-card class="bg-white rounded-lg pa-4">
    <div id="printQrCode" ref="printQrCode">
      <qrcode-image :value="urlCode" class="w-100" />
    </div>
    <v-row>
      <v-col cols="6">
        <v-btn
          v-print="{
            id: 'printQrCode',
            previewTitle: 'Qr Code',
            url: '',
            popTitle: 'Qr Code',
          }"
          class="w-100 pa-2 rounded"
          color="primary"
        >
          <v-icon size="24">mdi mdi-printer-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn @click="downloadPdf" class="w-100 pa-2 rounded" color="primary">
          <v-icon size="24">mdi mdi-file-download-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import QrcodeImage from "vue-qrcode-image";
import print from "vue3-print-nb";
import html2pdf from "html2pdf.js";

export default {
  props: {
    urlCode: {
      type: String,
      default: "",
    },
  },
  components: {
    QrcodeImage,
  },
  directives: {
    print,
  },

  methods: {
    downloadPdf() {
      html2pdf()
        .from(this.$refs.printQrCode)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          pdf.save("qr-code.pdf");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>