import ProblemComplexity from "../enums/problem-rarity.enum";

interface ProblemDescriptionView { 
  problemComplexity: ProblemComplexity;
  title: string;
  body: string;
  rating: number;
  sampleInput: string;
  sampleOutput: string;
  constraints: string;
  tags: string[];
  uuid: string;
}

export default ProblemDescriptionView;