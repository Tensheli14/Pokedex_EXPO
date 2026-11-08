import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const ARTWORK =
    "https://raw.githubusercontent.com/PokeAPI/sprites" +
    "/master/sprites/pokemon/other/official-artwork/";

export default function PokemonCard({ number, name, captured, onCapture }) {
    return (
        <View style={[styles.card, captured && styles.captured]}>
            <Image source={{ uri: `${ARTWORK}${number}.png` }} style={styles.image} />
            <View>
                <Text style={styles.number}>#{number}</Text>
                <Text style={styles.name}>{name}</Text>
                <Pressable style={styles.button} onPress={onCapture}>
                    <Text style={styles.buttonText}>
                        {captured ? "Capturé ✓" : "Capturer"}
                    </Text>
                </Pressable>
            </View>
        </View>
    );

}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12, 
        borderColor: "#7d7d7dc3",
        borderRadius: 12,
        borderWidth: 3,
    },
    image: { width: 60, height: 60 },
    number: { color: "#888888" },
    name: { fontSize: 14, fontWeight: "bold" },
    type: {
        alignSelf: "flex-start", 
        backgroundColor: "#ECE8DE",
        paddingHorizontal: 10, 
        borderRadius: 10, 
        overflow: "hidden"
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
