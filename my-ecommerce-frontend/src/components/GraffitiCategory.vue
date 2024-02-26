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
        @click="() => openSubcategory(image.alt)"
      >
        <h3 class="image-title">{{ image.title }}</h3>
        <img :src="image.src" :alt="image.alt" />
        <p>{{ image.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  props: {
    categoryName: String, // Der Name der Kategorie
  },
  data() {
    return {
      images: [
        {
          alt: "Graffiti",
          title: "Graffiti",
          description: "Beschreibung für Graffiti",
        },
        // ... Weitere Bilder für diese Kategorie
      ],
    };
  },
  methods: {
    openSubcategory(subcategory) {
      // Hier kannst du die Logik für das Öffnen der Unterseite hinzufügen
      // Beispiel: Verwende Vue Router, um zur Unterseite zu navigieren
      const router = useRouter();
      router.push(`/subcategory/${subcategory.toLowerCase()}`); // Passe den Pfad entsprechend an
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
