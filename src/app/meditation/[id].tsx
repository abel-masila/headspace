import { useLocalSearchParams, router } from "expo-router";
import { Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { meditations } from "@/data";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function MeditationDetails() {
	const { id } = useLocalSearchParams();

	const { top } = useSafeAreaInsets();

	const meditation = meditations.find(
		(meditation) => meditation.id === Number(id),
	);

	if (!meditation) return <Text>Meditation not found!</Text>;
	return (
		<SafeAreaView>
			<Text>{meditation?.title}</Text>
			<AntDesign
				onPress={() => router.back()}
				name="close"
				size={24}
				color="black"
				className="absolute  right-4"
				style={{ top: top + 16 }}
			/>
		</SafeAreaView>
	);
}
