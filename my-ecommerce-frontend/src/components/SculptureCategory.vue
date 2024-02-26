<template>
  <div>
    <h2 class="category-title">{{ categoryName }}</h2>
    <div class="image-container">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="image-item"
        @click="openSubcategory(image)"
      >
        <h3 class="image-title">{{ categoryName }}</h3>
        <img :src="image.src" :alt="image.alt" />
        <p>{{ image.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import sculptureImage from "@/assets/sculpture_men.jpg";
import { useRouter } from "vue-router";

export default {
  props: {
    categoryName: String,
  },
  data() {
    return {
      images: [
        {
          src: sculptureImage,
          alt: "Sculpture",
          description: "Beschreibung für Sculpture",
        },
        // ... Weitere Bilder für diese Kategorie
      ],
    };
  },
  methods: {
    openSubcategory(image) {
      // Hier die Logik für das Öffnen der Unterseite anpassen
      // Beispiel: Verwende Vue Router, um zur Unterseite zu navigieren
      const router = useRouter();
      // Hier musst du den Pfad basierend auf der ausgewählten Kategorie und Bild festlegen
      router.push(`/subcategory/${this.categoryName.toLowerCase()}/${image.alt.toLowerCase()}`);
    },
  },
};
</script>

<style scoped>
/* Stil für die Bilder */
.category-title {
  text-align: center;
  margin-top: 20px;
}

.image-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.image-item {
  text-align: center;
  margin: 10px;
  cursor: pointer;
}

.image-item img {
  width: 200px; /* Größere Breite für das Bild */
  height: auto;
}

.image-title {
  margin-bottom: 5px;
}
</style>
