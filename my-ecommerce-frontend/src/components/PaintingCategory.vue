<template>
  <div>
    <!-- Kategorie-Titel -->
    <h2 class="category-title">{{ categoryName }}</h2>

    <!-- Bilder anzeigen -->
    <div class="image-container">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="image-item"
        @click="openSubcategory"
      >
        <h3 class="image-title">{{ categoryDescription }}</h3>
        <img :src="image.src" :alt="image.alt" />
        <p>{{ image.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import paintingImage from "@/assets/painting.jpg"; // Pfade zu den Bildern anpassen
import { useRouter } from "vue-router";

export default {
  props: {
    categoryName: String, // Der Name der Kategorie
  },
  data() {
    return {
      images: [
        {
          src: paintingImage,
          alt: "Painting",
          description:
            "Explore impressive paintings that capture the essence of art and fill spaces with creativity.",
        },
        // ... Weitere Bilder für diese Kategorie
      ],
      categoryDescription: "Category Description Placeholder", // Hier kannst du die Beschreibung für die Kategorie einfügen
    };
  },
  methods: {
    openSubcategory() {
      // Hier kannst du die Logik für das Öffnen der Unterseite hinzufügen
      // Beispiel: Verwende Vue Router, um zur Unterseite zu navigieren
      const router = useRouter();
      router.push("/subcategory/painting"); // Passe den Pfad entsprechend an
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
