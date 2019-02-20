
import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
    zh: {
        home: '主頁',
        search: '搜尋',
        notice: '通知',
        profile : '個人',
        //home:"zh क्या हाल है ?",
        

        second:"मैं ठीक हूँ ?",

        errorTitle: '錯誤',
        hotSearch: '熱門搜尋',
        promotion: '優惠',
        listAllResult: '顯示所有結果',
        order: '排序',
        filter: '篩選',
        pleaseChoose: '請選擇',
        confirm: '確定',
        cancel: '取消',
        area: '區域',
        category: '課堂類別',
        level: '程度',

        choosed : '已選擇',
        loginText: '登入',
        registrationText: '註冊',
        guestLoginText: '遊客登入',
        emailPlaceHolder : '電郵地址',
        passwordPlaceHolder : '密碼',
        more: '更多',
        name: '名字',
        lessonName: '課程名稱',

        relatedPhoto : '相關照片',
        uploadPhoto : '上載照片',
        generalInformation : '基本資料',
        detailInformation : '詳細資料',
        location : '教學地區',
        


        education :'學歷',
        description: '簡介',
        descriptionSample : '例如 : 本人畢業於香港教育大學教育學系畢業,具有多年補習經驗, ...',
//特別擅長教育英文及地理科 教學手法簡單直接, 容易理解,且為人有耐性,並會根據學生的進度而施予相關教學'        ,
        notLoginErrorMessage: '請先登入才能使用這個功能',

        warning: '注意',
        notRegisterMessage : '此帳號還未註冊',
        notFilledInMessage : '! 請填上資料',

        newClass : '新增課程'
        

    },
    /*
    rowTitle:['區域', '類別', '項目'],
    

    cn:{
        search: '搜寻',
        home:"cn तू कसा आहेस ?",
        second:"मी ठीक आहे ?",
    },
    en:{
        search: 'Search',
        home:"How are You ?",
        second:"I am fine ",
    },
    fr:{
        home:"comment allez vous",
        second:"je vais bien",
    }
    */
});
export default strings;

  

//export const home = 'home'

//export const loginText = '登入'

//export const emailPlaceHolder = '電郵地址'
//export const passwordPlaceHolder = '密碼'
//export const loginText = '登入'

/*
export interface LocalizedStrings {
    upload: string;

}

const cn: LocalizedStrings = {
    upload: '更新',
};

const hk: LocalizedStrings = {
    upload: '更新',
};
*/
