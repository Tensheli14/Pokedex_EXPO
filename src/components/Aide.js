import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Aide() {
    const [AfficherAide, setAfficherAide] = useState(false);
  return (
    <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => setAfficherAide(!AfficherAide)}>
            <Text style={styles.buttonText}>{AfficherAide ? "Masquer l'aide" : "Afficher l'aide"}</Text>
        </Pressable>
        <Text>{AfficherAide && "Voici l'aide pour attraper des Pokémon."}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#9f7e7e",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
}
});