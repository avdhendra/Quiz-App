import { TouchableOpacity ,StyleSheet, GestureResponderEvent, ViewStyle, StyleProp, TextStyle} from "react-native";
import { ThemedText } from "./ThemedText";

interface ThemeButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void ;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export const ThemedButton: React.FC<ThemeButtonProps> = ({ title, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
           <ThemedText style={[styles.buttonText,textStyle]}>{title}</ThemedText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});