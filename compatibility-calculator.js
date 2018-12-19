const { candidates } = require('./data/candidates-data.js');

const calculateBestMatch = function(quizSubmissions) {
  // TODO: replace this...
  // return candidates[0];

  // TODO: implement the following algorithm for
  // calculating the candidate who is the best match for you

  // set closest match to 1st candidate

  // for each candidate
  //  for each question
  //    if question values are exactly the same
  //      add 2 points
  //    if question values are one score away
  //      add 1 point
  //  update the closest match

  // for ties, the last person who has the highest score is returned

  // return closest match

  let matchPoint = 0;
  let answerMatch = 0;
  let questionNum = 0;
  const candidateMatchPoint = [];

  // candidate番号：i
  // クイズ番号：j
  // クイズ枝番：k

  // user回答データ
  // Q(j)-(k):quizSubmissions[j][k].value.
  // candidate (i)人目 回答データ
  // Q(j)-(k):candidates[i][j][k].value

  // 回答比較とpoint計算
  // candidate人数ループ
  for (let i = 0; i < candidates.length; i += 1) {
    // クイズ番号ループ
    for (let j = 2; j < candidates[i].length; j += 1) {
      // 枝番ループ
      for (let k = 0; k < candidates[i][j].length; k += 1) {
        questionNum += 1;
        if (quizSubmissions[j][k].value === candidates[i][j][k].value) answerMatch += 1;
      }
      // 質問ごとにスコア計算
      switch (answerMatch) {
      // 全ての質問で回答が一致したら
      case questionNum:
        matchPoint += 2;
        break;
      // 質問の回答が1つだけ異なったら
      case questionNum - 1:
        matchPoint += 1;
        break;
      default:
        break;
      }
      // 質問が変わる前にanswerMatchを初期化
      questionNum = 0;
      answerMatch = 0;
    }
    // candidateごとにmatchPointを配列に格納する
    candidateMatchPoint.push(matchPoint);
    // candidateが変わる前にmatchPointを初期化
    matchPoint = 0;
  }

  // 最も一致するcandidateのvalueを探す
  const candidatePoint = Math.max.apply(null, candidateMatchPoint);
  // 最も一致するcandidateのindexを探す
  const candidateIndex = candidateMatchPoint.lastIndexOf(candidatePoint);
  return candidates[candidateIndex];
};

module.exports = {
  calculateBestMatch,
};
