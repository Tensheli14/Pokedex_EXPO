import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

const ARTWORK =
    "https://raw.githubusercontent.com/PokeAPI/sprites" +
    "/master/sprites/pokemon/other/official-artwork/";

const TYPE_COLORS = {
    Plante: "#78C850",
    Feu: "#F08030",
    Eau: "#6890F0",
    Électrik: "#F8D030",
};
    
export default function PokemonCard({ number, name, type }) {
    const [capturé, setCapturé] = useState(false);
    const color = TYPE_COLORS[type];

    return (
        <View style={[styles.card, { backgroundColor: color }, capturé && styles.captured]}>
            <Image source={{ uri: `${ARTWORK}${number}.png` }} style={styles.image} />
            <View>
                <Text style={styles.number}>#{number}</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.type}>{type}</Text>
            </View>
            <Pressable
                style={styles.button}
                onPress={() => setCapturé(!capturé)}
            >
                <Text style={styles.buttonText}>
                    {capturé ? "Capturé ✓" : "Capturer"}
                </Text>
            </Pressable>
        </View>
    );

}


const styles = StyleSheet.create({
    card: {
        flexDirection: "row", alignItems: "center", gap: 12,
        padding: 12, borderRadius: 14
    },
    image: { width: 80, height: 80 },
    number: { color: "#888888" },
    name: { fontSize: 18, fontWeight: "bold" },
    type: {
        alignSelf: "flex-start", backgroundColor: "#ECE8DE",
        paddingHorizontal: 10, borderRadius: 10, overflow: "hidden"
    },
    captured: {
        borderColor: "#000e38",
        borderWidth: 3
    },
    button: {
        marginLeft: "auto",
        backgroundColor: "#4e4949a0",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 12,
    },

});
