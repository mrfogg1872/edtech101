function submitForm() {
    const form = document.getElementById('diagnosis-form');
    const formData = new FormData(form);

    // 모든 문항이 응답되었는지 확인하는 로직
    for (let i = 1; i <= 30; i++) {
        if (!formData.has(`question${i}`)) {
            alert(`문항 ${i}에 응답하지 않았습니다. 모든 문항에 응답해 주세요.`);
            return; // 함수 종료, 점수 계산 및 페이지 이동 방지
        }
    }

    let scores = {
        digitalDevice: 0, // 디지털 기기 인식 및 활용
        digitalTeaching: 0, // 디지털 기반 교수학습
        digitalSupport: 0, // 디지털 기반 유아 이해 및 지원
        digitalCommunication: 0, // 디지털 의사소통 및 협력
        digitalCitizenship: 0, // 디지털 시민의식
        digitalProblemSolving: 0 // 디지털 문제해결
    };

    // 각 문항별 응답 점수를 수집하여 범주별로 점수 합산
    formData.forEach((value, key) => {
        const questionNumber = parseInt(key.replace('question', ''));
        const score = parseInt(value);

        if ([1, 7, 13, 19, 25].includes(questionNumber)) {
            scores.digitalDevice += score;
        } else if ([2, 8, 14, 20, 26].includes(questionNumber)) {
            scores.digitalTeaching += score;
        } else if ([3, 9, 15, 21, 27].includes(questionNumber)) {
            scores.digitalSupport += score;
        } else if ([4, 10, 16, 22, 28].includes(questionNumber)) {
            scores.digitalCommunication += score;
        } else if ([5, 11, 17, 23, 29].includes(questionNumber)) {
            scores.digitalCitizenship += score;
        } else if ([6, 12, 18, 24, 30].includes(questionNumber)) {
            scores.digitalProblemSolving += score;
        }
    });

    // 점수를 localStorage에 저장
    localStorage.setItem('scores', JSON.stringify(scores));

    // 결과 페이지로 이동
    window.location.href = 'result.html';
}
