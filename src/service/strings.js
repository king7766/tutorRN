
import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
    zh: {
        

        home: '主頁',
        search: '搜尋',
        notice: '通知',
        profile : '個人',
        //home:"zh क्या हाल है ?",
        avatar :'頭像',
        name : '䁥稱',

        second:"मैं ठीक हूँ ?",

        lesson:'課堂',

        // search
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
        subcategory: '進階分類',
        selectCategoryFirst: '先選擇類別',

        choosed : '已選擇',
        register: '登記',
        loginText: '登入',
        registrationText: '註冊',
        guestLoginText: '遊客登入',
        emailPlaceHolder : '電郵地址',
        passwordPlaceHolder : '密碼',
        more: '更多',
        name: '名字',
        lessonName: '課程名稱',

        // lesson 
        relatedPhoto : '相關照片',
        uploadPhoto : '上載照片',
        generalInformation : '基本資料',
        detailInformation : '詳細資料',
        location : '教學地點',
        price :'價錢(每節)',
        price_low : '$100 以下',
        price_mid : '$101 ~ 200',
        price_high : '$201 以上',
        
        gender: '性別', 
        gender_m : '男',
        gender_f : '女',

        job: '職業',

        education :'學歷',
        education_low:'小學',
        education_mid:'中學',
        education_high:'大專',
        education_exHigh:'大學或以上',

        description: '簡介',
        descriptionSample : '例如 : 本人畢業於香港教育大學教育學系畢業,具有多年補習經驗, ...',
//特別擅長教育英文及地理科 教學手法簡單直接, 容易理解,且為人有耐性,並會根據學生的進度而施予相關教學'        ,
        notLoginErrorMessage: '請先登入才能使用這個功能',
        pleaseSelectPhoto:'請選取頭像圖片',

        warning: '注意',
        notRegisterMessage : '此帳號還未註冊',
        notFilledInMessage : '! 請填上資料',

        newClass : '新增課程',
        submit : '提交',

        messageHere :'發表信息 ...',
        
        startTime: '開始時間',
        intervalTime: '課堂長度',

        startChat :'你們現在可以開始對話',



        //profile page :
        favouritTutor : '收藏導師',
        confirmedLesson : '已確認',
        appliedLesson: '已上課程',
        teachedLesson: '已教課程',
        
        startEditProfile: '編輯個人資料',
    },

    cn: {
        home: '主页',
        search: '搜寻',
        notice: '通知',
        profile : '个人',
    

        avatar :'头像',
        name : '䁥称',
        second:"मैं ठीक हूँ ?",

        lesson:'課堂',

        errorTitle: '错误',
        hotSearch: '热门搜寻',
        promotion: '优惠',
        listAllResult: '显示所有结果',
        order: '排序',
        filter: '筛选',
        pleaseChoose: '请选择',
        confirm: '确定',
        cancel: '取消',
        area: '区域',
        category: '课堂类别',
        subcategory: '進階分類',
        selectCategoryFirst: '先選擇類別',

        choosed : '已选择',
        register: '登记',
        loginText: '登入',
        registrationText: '注册',
        guestLoginText: '游客登入',
        emailPlaceHolder : '电邮地址',
        passwordPlaceHolder : '密码',
        more: '更多',
        name: '名字',
        lessonName: '课程名称',

        relatedPhoto : '相关照片',
        uploadPhoto : '上载照片',
        generalInformation : '基本资料',
        detailInformation : '详细资料',
        location : '教学地区',
        
        gender: '性别', 
        job: '职业',
        education :'学历',
        description: '简介',
        descriptionSample : '例如 : 本人毕业於香港教育大学教育学系毕业,具有多年补习经验, ...',
//特别擅长教育英文及地理科 教学手法简单直接, 容易理解,且为人有耐性,并会根据学生的进度而施予相关教学'        ,
        notLoginErrorMessage: '请先登入才能使用这个功能',
        pleaseSelectPhoto:'请选取头像图片',

        warning: '注意',
        notRegisterMessage : '此帐号还未注册',
        notFilledInMessage : '! 请填上资料',

        newClass : '新增课程',
        submit : '提交',

        messageHere :'发表信息 ...',
        startTime: '开始时间',
        intervalTime: '课堂长度',

        startChat :'你們現在可以開始對話',
        

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
