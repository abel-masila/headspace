import { FlatList } from "react-native";
import { meditations } from "@/data";
import MeditationListItem from "@/components/MeditationListItem";

export default function HomeScreen() {
	return (
		<FlatList
			data={meditations}
			renderItem={({ item }) => <MeditationListItem meditation={item} />}
			contentContainerClassName="gap-5 p-3"
			className="bg-white"
		/>
	);
}
