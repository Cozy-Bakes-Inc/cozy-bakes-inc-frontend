import StorySection from "../home/story-section";
import StoryCommitment from "./story-commitment";
import StoryHero from "./story-hero";
import StoryImage from "./story-image";

function Story() {
  return (
    <>
      <StoryHero />
      <StoryImage />
      <StorySection bg="bg-background" circle={false} />
      <StoryCommitment />
    </>
  );
}

export default Story;
