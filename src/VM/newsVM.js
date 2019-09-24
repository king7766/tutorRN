import {newsModel} from 'tutorRN/src/Model/newsModel'
import React from 'react';
import {observable, action, computed} from 'mobx'

/*
import {
  	getResponseFromApi
} from 'tutorRN/src/URLConfig';
*/
import * as Urlconfig from 'tutorRN/src/URLConfig'
import * as C from 'tutorRN/src/service/connection'
import * as E from 'tutorRN/src/service/env-config'

const API = 'http://api.news.tvb.com/news/v2.1.1/entry?profile=app&category=focus&page=0'

export default class newsVM{

	static myInstance = null;

	//userProfile: any
	//@observable refArray = []
	refArray: newsModel [] = []
	@observable showArray : newsModel [] = []
	index = 1
	//refArray = []

	static getInstance() {

        if (newsVM.myInstance == null) {	
            newsVM.myInstance = new newsVM()
        }
        return newsVM.myInstance
    }


	constructor()
	{
		/**** init all props here ****/

		this.load()
	}

	//@action
	async load()
	{
		await this.callAPI ()
	}

	getNews()
	{
		console.log('getNews = ' + this.refArray.length)
		return this.showArray
		
		

		if ( this.refArray.length > 2){

			var data = []
    		for ( var i = 0; i < 2; i ++){
      			data.push(this.refArray[i])
			}
			console.log('22222')
			return data
		}
		else{
			console.log('10 10 10 ')
			return this.refArray
		}
	}

	async refresh(){
		this.refArray = []
		this.showArray = []
		const res = await this.callAPI()
		return res

		//console.log('showArray = ' + this.showArray.length)
	}

	loadMore()
	{
		if (this.showArray.length < this.refArray.length ){
			for ( var i = this.showArray.length; i < this.refArray.length; i ++){
				this.showArray.push(this.refArray[i])
			}

			console.log('adding...')

			//this.showArray = this.showArray.concat(this.refArray[this.showArray.length])
		}
		//console.log('getNews = ' + this.showArray.length)

	}

	getNewsWithID(newsID)
	{
		var selectedNewsItem = this.refArray[this.refArray.map(function (item) { return item.id; }).indexOf(newsID)];
		
		return selectedNewsItem
		//console.log(selectedData)
	}

	@action
	async callAPI()
	{	//http://laravel50.com/admin/add
		//{tab:'type', name:345, seq:100} 
		//{token:'xRW8DwqoIxZBSlF83b2P'}

		/*
		C.getResponseFromApi('http://laravel50.com/admin/add', 'POST', {tab:'type', name:345, seq:100}  ).then( (json ) =>{
			
		})
		*/
		
		return C.getResponseFromApi(E.GET_NEWS, 'POST', {token:'xRW8DwqoIxZBSlF83b2P'} ).then( (json ) =>{
		//C.getResponseFromApi(E.GET_NEWS, 'POST', 'token=xRW8DwqoIxZBSlF83b2P' ).then( (json ) =>{	
			if( json.statusCode == 200)	
         	{
				
				for ( var i = 0; i < json.data.length; i ++)
				//for ( var i = 0; i < json.data.items.length; i ++)
				{
					this.refArray.push(newsModel.deserialize( json.data[i] ) )
					if ( this.showArray.length < 2)
					{
						console.log('setting show = 2')
						this.showArray.push (newsModel.deserialize( json.data[i] ))
					}
				}
				return true
				
				//this.inde x = 2
				//console.log(':: index = ' + this.index)

         	}
         	else
         	{
             	return false	
         	}
			
		})

		/*
		C.getResponseFromApi(API, 'GET', 'aaa').then( (json ) =>{
			if( json.statusCode == 200)	
         	{
				for ( var i = 0; i < json.data.items.length; i ++)
				//for ( var i = 0; i < 1; i ++)
				{
					this.refArray.push(newsModel.deserialize(json.data.items[i]))	
				}
         	}
         	else
         	{
         		//console.log('error ')
         	
         		
         	}
			
		})
		*/

		/*
		C.getResponseFromApi('http://laravel50.com/admin/add', 'POST', {tab:'type', name:345, seq:100} ).then ( (json) => {
			if ( json.statusCode == 200)
			{
				console.log('2000000')
			}
			
		})
		*/

	}

	tempNews(){
		return [
			{
				"id": "1",
				"tutor_id": "1",
				"tutor_name": "kevin",
				"tutor_thumb": "http://tutor.ho2find.com/uploads/1564718223_Screenshot 2019-07-26 at 10.02.59 am.png",
				"news_title": "舊款平治自焚 司機跳車逃生",
				"news_short_desc": "消防接報到場，開喉迅速將火救熄，平治車頭嚴重焚毀，事件中無人受傷。",
				"news_content": "九龍塘發生車著火事件，晚上10時許，一部舊款沿歌和老街上斜，途至根德道交界路口時，車頭突然冒煙起火，火勢猛烈，司機見狀立即落車，並報警求助。消防接報到場，開喉迅速將火救熄，平治車頭嚴重焚毀，事件中無人受傷。",
				"news_thumb": "https://static.appledaily.hk/images/e-paper/20180820/large/1534777710_4e39.jpg",
				"news_publish_start_date": "2018-08-21 00:00:00",
				"news_publish_end_date": null,
				"news_seq": "1",
				"news_priority": "1",
				"news_tag_list": [
					{
						"id": "1",
						"news_tag_name": "即時新聞",
						"news_tag_description": "即時新聞",
						"news_tag_seq": "1"
					},
					{
						"id": "2",
						"news_tag_name": "港聞",
						"news_tag_description": "港聞",
						"news_tag_seq": "2"
					}
				],
				"create_user": "admin",
				"create_date": "2018-08-21 00:00:00",
				"update_user": null,
				"update_date": null,
				"version_no": "1"
			},
			{
				"id": "2",
				"tutor_id": "4",
				"tutor_name": "Kingtai Leung",
				"tutor_thumb": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110",
				"news_title": "【好温馨呀】囝囝2個月生日 JC孖老公囡囡齊慶祝",
				"news_short_desc": "現年30歲的Jessica C.（JC），前年未婚生B，為安志杰誕下可愛B囡Tessa，去年兩人正式註冊結婚，婚後兩人繼續恩愛，不時都會喺社交網放閃，以及囡囡嘅生活照晒幸福。",
				"news_content": "現年30歲的Jessica C.（JC），前年未婚生B，為安志杰誕下可愛B囡Tessa，去年兩人正式註冊結婚，婚後兩人繼續恩愛，不時都會喺社交網放閃，以及囡囡嘅生活照晒幸福。今年6月JC再為老公追多個B仔Elvis，一家三口變四口，幸福--梗係要繼續晒啦！\r\n\r\n光陰似箭，Elvis噚日已經兩個月大喇，JC喺Ig嘅Story就放咗囝囝嘅靚仔相，同埋佢同老公、囡囡幫囝囝慶祝嘅短片。雖然，Tessa一度瞓咗覺，但大家依然好開心，Tessa仲代細佬吹蠟燭，又做代表鍚細佬一啖，JC就買咗個有維尼公仔嘅蛋糕。\r\n除此，JC又放咗一張Elvis眼仔碌碌望鏡頭影嘅相，以及安志杰變身慈父，踎喺度o氹囝囝笑嘅短片，真係隔住個mon都feel到好有愛，而Elvis有爸爸陪玩當然開心，全程笑到卡卡聲。",
				"news_thumb": "https://static.appledaily.hk/images/e-paper/20180820/large/1534748352_5962.jpg",
				"news_publish_start_date": "2018-08-21 00:00:00",
				"news_publish_end_date": null,
				"news_seq": "2",
				"news_priority": "2",
				"news_tag_list": [
					{
						"id": "3",
						"news_tag_name": "娛樂",
						"news_tag_description": "娛樂",
						"news_tag_seq": "3"
					}
				],
				"create_user": "admin",
				"create_date": "2018-08-21 00:00:00",
				"update_user": null,
				"update_date": null,
				"version_no": "1"
			},
			{
				"id": "3",
				"tutor_id": "1",
				"tutor_name": "kevin",
				"tutor_thumb": "http://tutor.ho2find.com/uploads/1564718223_Screenshot 2019-07-26 at 10.02.59 am.png",
				"news_title": "【DSE過來人】親製心意卡為考生打氣 抑鬱症狀元：別在制度裏迷失自我",
				"news_short_desc": "中學文憑試主科開考在即，《蘋果》邀請上屆狀元陳曉汶（Monica）分享備戰心得。還以為狀元會大談應試技巧",
				"news_content": "中學文憑試主科開考在即，《蘋果》邀請上屆狀元陳曉汶（Monica）分享備戰心得。還以為狀元會大談應試技巧，她卻寄語考生先學會接受自己是一個人，「會攰、會沮喪」；還以為升讀港大醫科後必定埋首溫習，她卻正休學籌備Startup，更花心思為中六師弟妹寫心意卡。這位與情緒病同行的「平民狀元」，言行總是「意料之外，情理之中」，正如她寫給考生的打氣字句︰「（考試）制度只是社會上的既得利益者制訂的遊戲規則，別在制度裏迷失自我。」\r\n\r\n有別於傳統名校狀元，來自將軍澳官立中學的她去年受訪時鮮有提及過人天賦和溫習技巧，反而細訴與抑鬱症同行的歲月。一年過後，Monica回母校派發親手設計的心意卡給中六生，為一眾應屆考生打氣。卡上字句密密麻麻，全是她的肺腑之言。她又讚自發回校練習中文口試的師弟妹非常「生性」。\r\n\r\n提起「當年今日」，Monica不諱言文憑試開考前夕同樣充滿迷惘，「你會好冇安全感，唔知未來發生咩事。（文憑試）一試定生死，咁死咗點算呢？」抑鬱情緒令她一度無法提起勁溫習，「你好理性咁知道（人生）有希望，但你感受唔到……我嗰陣唔知自己做緊咩，好似俾人落咗降頭咁」。幸好，她此時記起身邊的「小確幸」，如老師在Last Day送贈她的心意卡，又或是友人在自修室無聲無息留下的打氣便條，令她感到身邊有人並肩同行。\r\n\r\n作為過來人，Monica一年後回望文憑試，笑指它只是教育制度中的「階級遊戲」，「好多中六同學會覺得DSE係一個判斷你人生高低嘅遊戲，但其實有好多出路係大家忽略咗。」她希望考生平常心看待文憑試成績，「DSE唔係一個人嘅全部，只要你願意（繼續走下去），人生仍然係有好多可能性」。她又寄語考生不要逼得自己太緊，須接受自己「會攰、會沮喪」，如當下心情低落，無法集中精神溫習，不妨稍事休息，可想想考試後的畢業旅行自我激勵，或重溫Last Day合照自我振作。\r\n\r\n本身是長跑好手的Monica認為備戰文憑試與長跑異曲同工，需懂得時間分配及掌握發力節奏，更需時刻自我提醒不要受外在環境影響。即使在某科失手，心態亦必需馬上調節。她又提醒考生，應考前一天下午起避免喝咖啡或提神飲品，以免影響睡眠質素；睡前確保應試所需文具及用品齊備。她不建議考生在開考前一天繼續操卷，反而應重溫自己作業的「失分位」，自我提醒不要再犯。\r\n\r\n至於考試當天，Monica建議考生提早半小時抵達試場準備，及不要喝太多水。她留意到不少考生開考前仍會手持筆記溫習，或反而令心情更加緊張，「任何令個腦唔平靜嘅嘢都唔好做」；當天如有多於一份試卷開考，完成首份試卷後亦不宜與人討論。\r\n\r\nDSE狀元應試小貼士\r\n1. 臨考前一天下午開始不喝咖啡或提神飲品，以免影響睡眠\r\n2. 重溫作業或Past paper提醒自己的「失分位」；不宜再操卷\r\n3. 提早準備Checklist，睡前檢查應試行裝，確保文具及所需物品（如准考證）齊備\r\n4. 提早半小時抵達試場準備，當日早上不宜喝太多水\r\n5. 開考前不宜再拿筆記溫習\r\n6. 如有中場休息時間，切忌與他人討論考試表現或對答案\r\n資料來源︰上屆文憑試狀元陳曉汶",
				"news_thumb": "https://static.appledaily.hk/images/e-paper/20190329/large/1553861543_0489.png",
				"news_publish_start_date": "2019-07-17 00:00:00",
				"news_publish_end_date": null,
				"news_seq": "3",
				"news_priority": "1",
				"news_tag_list": [
					{
						"id": "1",
						"news_tag_name": "即時新聞",
						"news_tag_description": "即時新聞",
						"news_tag_seq": "1"
					}
				],
				"create_user": "admin",
				"create_date": "2019-07-17 00:00:00",
				"update_user": null,
				"update_date": null,
				"version_no": "1"
			},
			{
				"id": "4",
				"tutor_id": "4",
				"tutor_name": "Kingtai Leung",
				"tutor_thumb": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110",
				"news_title": "【夏天必備】DIY裝車窗太陽擋車廂降7度 平中貴價錢差4倍有乜分別？",
				"news_short_desc": "天時暑熱攝氏30多度高溫，坐在車廂時也會想有太陽擋幫助遮擋陽光。",
				"news_content": "天時暑熱攝氏30多度高溫，坐在車廂時也會想有太陽擋幫助遮擋陽光。市面上有很多選擇，近年不少車主選擇一種太陽擋類型，是每個車窗有一塊獨立固定的太陽擋，它的好處當然是比較穩固，阻擋陽光射進車廂、為乘客防曬之餘，亦減低車廂的皮革位及塑膠位因暴曬所致的損害。其次當然是隔熱，這類型太陽擋一般聲稱也可以為車廂降低6至7度，曬完跳上車沒那麼熱。最重要當然是太陽擋不犯法，以往很多人喜歡貼茶色玻璃貼，但往往觸犯法例。根據《道路交通(車輛構造及保養)規例》，是容許在車窗(車側和車尾)加裝如窗簾的設備，惟窗簾不得阻礙駕駛者觀看反射鏡的視線。\r\n\r\n購買這類型太陽擋時，也要提供車款，因太陽擋款式是因應車款的車窗玻璃尺碼及形狀而製造。少則可買一塊車尾擋風玻璃太陽擋，最多七塊包密全車U形也可。市面上各種品牌的太陽擋，基本的設計是透過一個電線框緊貼車窗框邊，只要攝入去便可，可以說是不用安裝。車尾是固定窗不能打開，但車側玻璃窗有機會打開，它們會提供小釦加固太陽擋，即使開窗也不怕被風吹。台灣品牌的小釦就利用3M膠貼貼在窗邊，德國品牌是靠小鈎釦在膠邊內，仿似較穩固。車主選擇時要留意，車尾太陽擋會否過黑，因而影響看倒後鏡的視線。至於司機位兩側車窗，一般形狀也不會跟車窗相同，留空一格方便看清倒後側鏡，車主也要留意布料能否看穿盲點位。\r\n\r\n市面上這類型太陽擋的選擇頗多，記者比拼三款，價錢可相差幾倍，豐儉由人。最平是淘寶395人民幣，未連運費一套7件。其次是香港品牌台灣製造的CarLab，一套七件約$1,200港元，若然車款較少車窗，一套五件約$1,100港元。最貴是德國品牌Laitovo，一般私家車款U字形全套$1,800港元，如果是旅行車款一套7件就要$2,200港元。三者價錢分別如此大，用料當然不同：首先說大陸出品，拿上手感覺輕飄飄，邊框比較軟欠硬度；台灣代表感覺剛性多一點，但跟德國的剛硬度相比差得甚遠；德國品牌感覺紮實很多，框邊剛性夠，裝上去會更貼服，挺身一點，效果又可持久一點。價錢的另一分野就是布料的密度：大陸出品看上去最疏，用料是最薄；至於台灣出品，剛好介紹這款是特別加密版，所以用料最厚、密度最高、氣孔最小；德國的車尾玻璃看上去的氣孔比較疏，因為要方便駕駛者看倒後鏡，但德國品牌的不同之處，是車尾與車側的布料不一樣，車側密度高很多，感覺很滑手，摸上去布料都頗佳，實在明顯感受到何謂一分錢一分貨。至於如何選擇，就要看各位車主的荷包了。\r\n\r\n查詢︰\r\n香港汽車精品屋（荃灣德士古道62-70號寶業大廈B座8樓7室）\r\n台日汽車用品（旺角黑布街99-99A號地下）\r\n\r\n記者：許維雅\r\n攝影：徐振國\r\n編輯：鄒仲安",
				"news_thumb": "https://static.appledaily.hk/images/e-paper/20190715/large/1563182815_f8f1.jpg",
				"news_publish_start_date": "2019-07-17 00:00:00",
				"news_publish_end_date": null,
				"news_seq": "4",
				"news_priority": "1",
				"news_tag_list": [
					{
						"id": "1",
						"news_tag_name": "即時新聞",
						"news_tag_description": "即時新聞",
						"news_tag_seq": "1"
					}
				],
				"create_user": "admin",
				"create_date": "2019-07-17 00:00:00",
				"update_user": null,
				"update_date": null,
				"version_no": "1"
			},
			{
				"id": "5",
				"tutor_id": "1",
				"tutor_name": "kevin",
				"tutor_thumb": "http://tutor.ho2find.com/uploads/1564718223_Screenshot 2019-07-26 at 10.02.59 am.png",
				"news_title": "【年輕化】 三高成中風主要誘因 少運動心血管腦血管暗藏危機",
				"news_short_desc": "【特約報道】以前中風是老人家才容易患上的疾病，近年中風已有年輕化趨勢，40-50歲的病患者開始增加，甚至廿歲年輕人也會中招。",
				"news_content": "【特約報道】以前中風是老人家才容易患上的疾病，近年中風已有年輕化趨勢，40-50歲的病患者開始增加，甚至廿歲年輕人也會中招。中風死亡率約為25%，已成為香港第4號殺手，現時每年約萬人因急性中風入住公立醫院，部份因延誤治療對病人腦部構成永久性損傷，情況令人擔憂。有醫生指中風與都市人的生活習慣有關，尤其是引至高血糖、高血壓及高血脂三高問題的飲食習慣，更加是中風的元兇之一。\r\n\r\n中風之所以令人聞之色變，在於一旦腦部血液供應減少會令腦細胞缺氧，數分鐘內就可以令腦細胞損壞而失去功能，進而令該部份腦細胞所支配的身體功能受障礙。中風一般可分為兩種類型：缺血性腦中風及出血性腦中風。缺血性中風是腦血管栓塞所引致，佔中風個案七成，與「三高」或患有心房顫動有關；出血性中風是指腦內血管爆裂出血，血塊導致血管受阻塞，多與長期的高血壓有關。\r\n\r\n中風的成因很多，例如本身患心臟疾病、先天血管病變，或有代謝性疾病的人士，均為高危一族。另外長期食用高脂肪食物或飲用大量糖份偏高飲料，也較易出現中風情況。想預防中風除了注意飲食之外，適量的運動可以減低血液中膽固醇的含量，降低高血壓患者的血壓，並改善冠狀動脈的循環，減低中風風險。\r\n\r\n從中醫角度看，治療急性中風會採用針灸刺激穴位「醒腦開竅」，達到疏通經絡和止血的作用，有機會減輕中風帶來的嚴重併發症。例如在中風復康治療上，會用針灸協助患者恢復肢體功能、失語和吞嚥困難等情況。至於在用藥方面，中醫臨床常用到「補陽還五湯」，或可改善缺血性中風患者的偏癱、失語等症狀之餘，對部份患者有一定作用，同時沒有與西藥相沖問題，與針灸一樣安全有效。\r\n\r\n不過遇上緊急情況，不得不提安宮牛黃丸，如馬百良出品安宮牛黃丸就依據祖傳藥方，成份包括牛黃、麝香、僵蠶、防風、全蠍、膽南星、天花粉、薑半夏等等。當中牛黃可清心瀉火、麝香可開竅通絡、全蠍則可袪風解毒，適合體內熱毒太盛、肝火重會面紅目赤及痰多難出人士。不過留意市面上有些安宮牛黃丸以普通食物形式包裝，只標示營養標籤。事實上，香港售賣的中成藥須經中醫藥管理委員會申請註冊，馬百良安宮牛黃丸的包裝上就有法例條文訂明的標籤及說明書的法例條文，以及中成藥註冊標號，經過藥理、毒理同穩定性測試，對消費者來說自然更有保證。",
				"news_thumb": "https://static.appledaily.hk/images/e-paper/20190712/large/1562920853_22a6.jpg",
				"news_publish_start_date": "2019-07-17 00:00:00",
				"news_publish_end_date": null,
				"news_seq": "5",
				"news_priority": "1",
				"news_tag_list": [
					{
						"id": "1",
						"news_tag_name": "即時新聞",
						"news_tag_description": "即時新聞",
						"news_tag_seq": "1"
					}
				],
				"create_user": "admin",
				"create_date": "2019-07-17 00:00:00",
				"update_user": null,
				"update_date": null,
				"version_no": "1"
			},
			{
				"id": "6",
				"tutor_id": "4",
				"tutor_name": "Kingtai Leung",
				"tutor_thumb": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110",
				"news_title": "【蘋果劇】Apple TV+《For All Mankind》新預告 紀念阿波羅登月50年",
				"news_short_desc": "今年Apple有自製劇集《For All Mankind》，當年今日7月16日就係阿波羅11號發射之時，趁着50周年紀念，《For All Mankind》有新預告公開，雖然不算太多新片段，但內裏就有製作團隊的訪問。",
				"news_content": "今年Apple有自製劇集《For All Mankind》，當年今日7月16日就係阿波羅11號發射之時，趁着50周年紀念，《For All Mankind》有新預告公開，雖然不算太多新片段，但內裏就有製作團隊的訪問。故事講述有關當年各國要搶先探索太空的故事，預定年尾開播。\r\n\r\n劇集由艾美獎得獎者Ronald D. Moore(作品有《Outlander》、《Star Trek》、《Battlestar Galactica》)製作，會講述NASA太空人、工程師及他們家庭的故事 ; 參演演員就有Joel Kinnaman、Michael Dorman、Wrenn Schmidt、Shantel VanSanten、Sarah Jones及Jodi Balfour等等。\r\n\r\n預告\r\nhttps://youtu.be/fLWkkBtyCMs\r\n\r\n撰文：Michael",
				"news_thumb": "https://static.appledaily.hk/images/e-paper/20190716/large/1563264281_d7fd.jpg",
				"news_publish_start_date": "2019-07-17 00:00:00",
				"news_publish_end_date": null,
				"news_seq": "6",
				"news_priority": "1",
				"news_tag_list": [
					{
						"id": "1",
						"news_tag_name": "即時新聞",
						"news_tag_description": "即時新聞",
						"news_tag_seq": "1"
					}
				],
				"create_user": "admin",
				"create_date": "2019-07-17 00:00:00",
				"update_user": null,
				"update_date": null,
				"version_no": "1"
			},
			{
				"id": "7",
				"tutor_id": "1",
				"tutor_name": "kevin",
				"tutor_thumb": "http://tutor.ho2find.com/uploads/1564718223_Screenshot 2019-07-26 at 10.02.59 am.png",
				"news_title": "【逆權運動】零售協會：若示威持續 料全年銷售額跌雙位數 籲政府早日解決問題",
				"news_short_desc": "香港零售管理協會今日就近期本港遊行活動持續對零售業的影響發表回應。",
				"news_content": "香港零售管理協會今日就近期本港遊行活動持續對零售業的影響發表回應。協會表示，大部份會員公司表示6月及7月第一個星期的營業額平均錄得單位數至雙位數跌幅，跌幅視乎不同的零售類別表現。協會指，大型遊行活動令個別店舖暫停營業，對市民生活及營商環境有所影響，協會呼籲政府早日和平解決問題使社會秩序重回正軌。\r\n\r\n雖然7月及8月是零售業的傳統暑假銷售旺季，但近日大型遊行活動在各區蔓延，協會指，會員預計生意將錄得雙位數跌幅。業界擔心事件會打擊本港作為安全城市、美食之都及購物天堂的國際形象。協會呼籲僱主與僱員應保持緊密溝通，面對特殊情況時，應以僱員安全為最重要考慮因素。若情況持續，協會將修訂今年全年整體銷售額的預測為錄雙位數字跌幅。\r\n\r\n相關新聞：【逆權運動】半百口罩男女夜襲大埔 「連儂隧道」遭貼多國國旗\r\n\r\n政府統計處於今年7月初公佈5月最新零售數據，5月零售業總銷貨價值臨時估計為400億元，按年下跌1.3%，優於市場預期的跌4.3%，亦較4月跌4.5%有所收窄。零售協會主席謝邱安儀此前預期本港零售銷貨額全年錄低單位數增長。\r\n\r\n周大福港澳首季同店跌11%\r\n周大福（1929）公佈截至6月底止首季經營數據，中國和港澳的零售值按年分別增長24%和下跌6%；同店銷售分別上升11%和下跌11%；同店銷量分別下跌3%和下跌14%。集團表示，港澳市場受高基數影響，以及宏觀環境不明朗，使消費氣氛審慎，導致同店銷售下跌，而內地同店銷售則保持增長勢頭。按產品同店銷售表現，內地的珠寶鑲嵌首飾增長穩健，上升8%；香港則下跌至16%。黃金產品方面，分別上升12%和下跌13%。\r\n\r\n期內，周大福在內地淨增設115個零售點；港澳及其他市場開設了3個周大福珠寶零售點。截至6月底止，集團共有3,248點零售點。\r\n\r\n周生生(116)大中華營運總經理劉克斌說，據所得最新初步銷售數字，6月生意跌近一成，自6月下半個月所見，內地客人流明顯減少，「改得行程都改」，不論本地客或內地客均減少於周未購物，雖然6月澳門分店生意按年錄得輕微增長，但暫未見內地客因香港社會事件而轉到澳門旅遊，相信澳門生意微升與香港近況無關。劉又表示，由於社會形勢未有改善，7月上半個月跌勢持續。\r\n\r\nSKECHERS:港6月生意有升幅\r\n美國運動品牌SKECHERS港澳及東南亞地區總裁梁成永表示，受近日社會事件影響，分店生意受影響在所難免，例如上周日（14日）沙田新城市廣場「商場變戰場」，SKECHERS位於5樓的分店亦提早關店兩小時；上月有大型遊行活動，銅鑼灣區分店亦考慮到員工安全而短暫「落閘」，「人潮過後再開返舖，盡量做生意」。但梁表示，由於公司6月與人氣動漫「海賊王」推出聯乘產品，又與海洋公園合作積極宣傳，6月生意未有受影響，且按年錄得升幅，「當然如果冇咗遊行示威，升幅會唔會再多啲呢？又好難講」。被問到7月生意情況，梁表示上半個月旅遊區分店人流仍受影響，以銀聯卡、Alipay及微信支付付款的內地客交易量下降。\r\n\r\n記者：邱曉欣",
				"news_thumb": "https://static.appledaily.hk/images/e-paper/20190716/large/1563269128_d627.jpg",
				"news_publish_start_date": "2019-07-17 00:00:00",
				"news_publish_end_date": null,
				"news_seq": "7",
				"news_priority": "1",
				"news_tag_list": [
					{
						"id": "2",
						"news_tag_name": "港聞",
						"news_tag_description": "港聞",
						"news_tag_seq": "2"
					}
				],
				"create_user": "admin",
				"create_date": "2019-07-17 00:00:00",
				"update_user": null,
				"update_date": null,
				"version_no": "1"
			},
			{
				"id": "8",
				"tutor_id": "4",
				"tutor_name": "Kingtai Leung",
				"tutor_thumb": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110",
				"news_title": "【全球首創】KFC中秋「全桶」月餅正式登場 香辣雞絲果仁月餅＋黃金流心奶皇月餅",
				"news_short_desc": "今年中秋KFC 首次推出月餅，以「全桶」形式登場，口味分別是香辣雞絲果仁月餅和黃金流心奶皇月餅。",
				"news_content": "今年中秋KFC 首次推出月餅，以「全桶」形式登場，口味分別是香辣雞絲果仁月餅和黃金流心奶皇月餅。前者加入果仁、杏仁、葵花籽及合桃，配上香辣雞肉鬆，肉絲酥香惹味，口感十足；後者月餅外層金黃酥軟，裡面是金沙鹹蛋黃奶皇餡，散發陣陣香濃蛋香和奶香。月餅劵即日起開始發售，憑劵可於8月13日至9月10日在指定之香港肯德基餐廳換領。\r\n\r\n採訪、拍攝：顧曉暉",
				"news_thumb": "https://static.appledaily.hk/images/e-paper/20190716/large/1563269643_471d.jpg",
				"news_publish_start_date": "2019-07-17 00:00:00",
				"news_publish_end_date": null,
				"news_seq": "8",
				"news_priority": "1",
				"news_tag_list": [
					{
						"id": "2",
						"news_tag_name": "港聞",
						"news_tag_description": "港聞",
						"news_tag_seq": "2"
					}
				],
				"create_user": "admin",
				"create_date": "2019-07-17 00:00:00",
				"update_user": null,
				"update_date": null,
				"version_no": "1"
			},
			{
				"id": "9",
				"tutor_id": "1",
				"tutor_name": "kevin",
				"tutor_thumb": "http://tutor.ho2find.com/uploads/1564718223_Screenshot 2019-07-26 at 10.02.59 am.png",
				"news_title": "【逆權運動】「隻揪Sir」海報遍地開花 驚現英國倫敦街頭",
				"news_short_desc": "最近香港不同地方都出現「隻揪Sir」的「蹤影」，事源有警員在早前的「旺角黑夜」，大聲呼喝市民「認X住我呀」、「隻揪呀」",
				"news_content": "最近香港不同地方都出現「隻揪Sir」的「蹤影」，事源有警員在早前的「旺角黑夜」，大聲呼喝市民「認X住我呀」、「隻揪呀」，不少人遂稱他為「隻揪Sir」，並響應其號召，到其住處所屬的大埔「連儂牆」，張貼有其肖像的海報，呼籲其他人「認X住」他，小心他要與他人「隻揪」的暴力傾向。雖然警方多次無理動用大批防暴警力，到場拆除大大小小的「隻揪Sir」海報，被戲稱為「撕紙狗」，但市民「撕一貼十」的精神遍地開花，海報近日更在台灣西門町，甚至英國倫敦街頭出現。\r\n\r\n連儂牆散落香港各區，當中以大埔的「連儂隧道」最具規模，除有市民自發張貼寫下打氣字句的memo紙外，有市民貼出印有「隻揪Sir」容貌的海報，其中一幅面積更有約2米乘1.5米大。不過警方聲稱海報披露未經資料使用者同意而取得的個人資料，涉違《個人資料（私隱）條例》第64條，早前派員到場清拆。\r\n\r\n不過有網民發現，「隻揪Sir」的海報日前出現於台灣各處，其中在台北西門町的鬧市，更有一幅約2呎半高的「隻揪Sir」海報，被張貼於廣告燈柱上，引來網民瘋傳。香港警察除「揚名」台灣，近日更「衝出國際」；英國倫敦街頭驚現多張「隻揪Sir」海報。有網民提議將中文海報內容翻譯成英文，讓更多外國人了解香港警暴。\r\n\r\n首爾連儂牆撐香港\r\n另外，有讀者向《蘋果》報料，指她有香港朋友到南韓首爾旅遊時，於江南站附近的Gangnam Square連儂牆，張貼「香港加油」、「全面撤回」、「林鄭下台」和「成立獨立調查」等字眼的memo紙。據悉，當地一帶都有很多牆壁，讓人張貼memo紙，表達心中所想，有如香港的連儂牆般。報料的讀者指，其朋友一直都有遊行集會「反送中」，衷心希望港府全面撤回修例，更深深不忿警方對市民施暴卻不被追究，故支持成立獨立調查委員會，追究警方濫權濫暴。",
				"news_thumb": "https://static.appledaily.hk/images/e-paper/20190716/large/1563256893_6ef2.png",
				"news_publish_start_date": "2019-07-17 00:00:00",
				"news_publish_end_date": null,
				"news_seq": "9",
				"news_priority": "1",
				"news_tag_list": [
					{
						"id": "2",
						"news_tag_name": "港聞",
						"news_tag_description": "港聞",
						"news_tag_seq": "2"
					}
				],
				"create_user": "admin",
				"create_date": "2019-07-17 00:00:00",
				"update_user": null,
				"update_date": null,
				"version_no": "1"
			},
			{
				"id": "10",
				"tutor_id": "4",
				"tutor_name": "Kingtai Leung",
				"tutor_thumb": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110",
				"news_title": "【逆權運動】被指咬斷警長手指及打斷警司手指骨 港大畢業生獲准保釋禁足新城市",
				"news_short_desc": "日前沙田新城市廣場警民大衝突中，一名警長疑被示威者咬斷右手無名指其中一截，示威者被控4罪今午於沙田裁判法院提堂。",
				"news_content": "日前沙田新城市廣場警民大衝突中，一名警長疑被示威者咬斷右手無名指其中一截，示威者被控4罪今午於沙田裁判法院提堂。據知被告為本年度的香港大學理學院畢業生。控方今於庭上指控被告用雨傘從後襲擊一名警員後頸、並打斷一名高級警司手指骨，及咬斷一名警長手指。控方申請將案押後至9月10日再訊，以作進一步調查，並反對被告保釋。裁判官練錦鴻最終批准被告以現金及人事各1萬元保釋外出，但須依時到警署報到、禁足案發的新城市廣場、不得離港及要守宵禁令，每晚12時至早上6點須留在家中。\r\n\r\n被告杜啟華（22歲）報稱學生，被控兩項有意圖而傷人、一項襲警及一項未能在規定下出示身份證明文件罪，指他於今年7月14日晚上，在沙田新城市廣場一期L3店舖「LONGCHAMP」外襲擊警員葉卓軒、意圖使高級警司梁子健身體受嚴重傷害、在店舖「COACH」外意圖使偵緝警長梁啟業身體受嚴重傷害，以及在上述地點未能向警員陸健明出示身份證明文件。\r\n\r\n被告身穿風褸並戴口罩出庭，甫出庭，主任裁判官練錦鴻便要求被告脫下口罩。書記向被告宣讀4項控罪，他表示明白，暫毋須答辯。\r\n\r\n控方申請將案件押後至9月10日，待警方進一步調查，包括向3名受傷的警務人員錄取口供，並索取現場的閉路電視片段。控方透露有關閉路電視包括新城市廣場、沙田廣場、好運中心和偉華中心，故需時索取和觀看，另亦須索取醫療報告和科學鑒證。\r\n\r\n控方讀出指控，指案發7月14日當天，有數千人在沙田新城市廣場集結，源於反對修訂逃犯條例。警方於晚上7時已表明清場，並8度向示威者發出警告。\r\n\r\n於晚上9時40分，被告在沒有任何挑釁及宣示的情況下，先用雨傘從後毆打警員葉卓軒的後頸。眼見葉受傷，其他警員包括高級警司梁子健上前支援，混亂間梁跌倒，被告於是用雨傘打梁的頭部，梁用手擋格，導致右手無名指骨折。\r\n\r\n梁及後捉住被告，其他警員上前協助制服被告，糾纏間被告將警長梁啟業右手無名指前端咬斷。控方並向法庭呈上兩名警員的骨折、斷指相片。\r\n\r\n數十名市民今天早於中午1時便抵達沙田裁判法院，排隊領籌入庭旁聽，司法機構預留給公眾人士的80個席位全部坐滿，另有逾20名市民需要站立旁聽。練官最終批准被告保釋，公眾席上旁聽的市民明顯鬆一口氣。但當練官宣讀保釋條件時，提到「唔可以去新城市廣場」時，旁聽市民忍俊不禁發出笑聲。\r\n\r\n【案件編號：STCC2840/19】\r\n記者楊思雅 鄭語霆",
				"news_thumb": "https://static.appledaily.hk/images/e-paper/20190716/large/1563271327_8c20.jpg",
				"news_publish_start_date": "2019-07-17 00:00:00",
				"news_publish_end_date": null,
				"news_seq": "10",
				"news_priority": "1",
				"news_tag_list": [
					{
						"id": "2",
						"news_tag_name": "港聞",
						"news_tag_description": "港聞",
						"news_tag_seq": "2"
					}
				],
				"create_user": "admin",
				"create_date": "2019-07-17 00:00:00",
				"update_user": null,
				"update_date": null,
				"version_no": "1"
			}
		]
	}

}