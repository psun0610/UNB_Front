<template>
    <div>

        <div class="about kg-font">
            <h1 class="">활동 점수</h1>
            <div style="text-align:start">
                <p>토론 글 작성 : <b>20점</b>을 받을 수 있어요</p>
                <p>밸런스 게임 선택 : <b>10점</b>을 받을 수 있어요</p>
                <p>댓글 작성 :<b>5점</b>을 받을 수 있어요</p>
            </div>
        </div>
        <div style="margin:2rem 0rem 4rem 0rem">
            <div style="display:flex">
                <img src="../../public/badges/base.png" alt="" class="badge">
                <p style="display:flex; align-items:center" class="badge_title">기본 뱃지 : 가입 즉시 받을 수 있어요.</p>
            </div>
            <div style="display:flex; margin: 20px 0;">
                <img src="../../public/badges/bronze.png" alt="" class="badge">
                <p style="display:flex; align-items:center" class="badge_title">브론즈 뱃지 : 브론즈 등급을 달성하면 드려요. 브론즈 등급은 활동점수
                    30을 기록하면 달성 할 수 있어요
                </p>
            </div>
            <div style="display:flex; margin: 20px 0;">
                <img src="../../public/badges/silver.png" alt="" class="badge my-shadow">
                <p style="display:flex; align-items:center" class="badge_title">실버 뱃지 : 실버 등급을 달성하면 드려요. 실버 등급은 활동점수
                    300을 기록하면 달성 할 수 있어요
                </p>
            </div>
            <div style="display:flex; margin: 20px 0;">
                <img src="../../public/badges/gold.png" alt="" class="badge my-shadow">
                <p style="display:flex; align-items:center" class="badge_title">골드 뱃지 : 골드 등급을 달성하면 드려요. 골드 등급은 활동점수
                    600을 기록하면 달성 할 수 있어요
                </p>
            </div>
            <div style="display:flex; margin: 20px 0;">
                <img src="../../public/badges/platinum.png" alt="" class="badge my-shadow">
                <p style="display:flex; align-items:center" class="badge_title">플레티넘 뱃지 : 플레티넘 등급을 달성하면 드려요. 플레티넘 등급은
                    활동점수 1000을 기록하면 달성 할 수
                    있어요</p>
            </div>
            <div style="display:flex; margin: 20px 0;">
                <img src="../../public/badges/diamond.png" alt="" class="badge my-shadow">
                <p style="display:flex; align-items:center" class="badge_title">다이아 뱃지 : 다이아 등급을 달성하면 드려요. 다이아 등급은 활동점수
                    1600을 기록하면 달성 할 수
                    있어요</p>
            </div>
            <div style="display:flex; margin: 20px 0;">
                <img src="../../public/badges/master.png" alt="" class="badge my-shadow">
                <p style="display:flex; align-items:center" class="badge_title">마스터 뱃지 : 최고 등급인 마스터 등급을 달성하면 드려요. 마스터
                    등급은 활동점수 2500을 기록하면 달성
                    할 수 있어요</p>
            </div>
            <div style="display:flex; margin: 20px 0;">
                <img src="../../public/badges/king.png" alt="" class="badge my-shadow">
                <p style="display:flex; align-items:center" class="badge_title">토론왕 뱃지 : 매일 자정에 토론왕 1등으로 마무리한 분에게 드려요. 하루 중 가장 높은
                    활동점수를 기록하면 토론왕이 될 수 있어요</p>
            </div>
            <div style="display:flex; margin: 20px 0;">
                <img src="../../src/assets/qm.png" alt="" class="badge my-shadow">
                <p style="display:flex; align-items:center" class="badge_title">KDT 뱃지 : 운영진에게 요청하면 드려요. 운영진과 친분이 있으신분들은
                    받을 수 있을거에요</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.about {
    max-width: 50rem;
    margin: 120px 0px 30px 0px;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 5px solid #4BBEFF;
    border-right: 5px solid #4BBEFF;
    border-top: 5px solid #FF719B;
    border-left: 5px solid #FF719B;
    padding: 3vmin 10vmin;
    font-weight: bold;
}

.badge {
    width: 7rem;
    height: 7rem;
    margin-right: 2rem;
    object-fit: cover;
    border-radius: 50%;
}

.badge_title {
    font-size: 15px;
    font-weight: bold;
}
</style>