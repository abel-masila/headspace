import { Text, View } from "react-native";

import type { Meditation } from "@/types";

export default function MeditationListItem({
	meditation,
}: { meditation: Meditation }) {
	return (
		<View className="p-5 border-2 rounded-2xl border-gray-300">
			<Text className="font-semibold  text-2xl ">{meditation.title}</Text>
		</View>
	);
}
