import ProblemComplexity from "src/models/enums/problem-rarity.enum";

export interface ProblemListFilter { 
  name: string,
  complexity: ProblemComplexity[],
  tags: string[],
}