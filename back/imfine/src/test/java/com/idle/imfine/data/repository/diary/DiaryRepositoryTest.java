//package com.idle.imfine.data.repository.diary;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//import com.idle.imfine.data.entity.Diary;
//import com.idle.imfine.data.entity.User;
//import com.idle.imfine.data.repository.user.UserRepository;
//import java.time.LocalDateTime;
//import javax.transaction.Transactional;
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
//
//@SpringBootTest
////@Transactional
//@EnableJpaAuditing
//class DiaryRepositoryTest {
//
//    @Autowired
//    DiaryRepository dr;
//
//    @Autowired
//    UserRepository ur;
//
//    @Test
////    @Transactional
//    public void 집어넣기(){
//
//
//        Diary saved = dr.save(Diary.builder()
//                        .writer(null)
//                        .medicalId(1)
//                        .title("안녕")
//                        .description("안녕")
//                        .image("웃는파일url")
//                        .active(true)
//                        .paperCount(0)
//                        .startedDate(LocalDateTime.now())
//                        .subscribeCount(0)
//                .build());
//
//        Diary diary = dr.findById(saved.getId())
//                .orElseThrow(RuntimeException::new);
//
//        Assertions.assertThat(diary.getId()).isEqualTo(saved.getId());
//        /////////////////////////////////////////////////////////////
////
//        Diary foundDiary = dr.findById(saved.getId())
//                .orElseThrow(RuntimeException::new);
//
//        String modify = "수정함";
//        foundDiary.setDescription(modify);
//        dr.save(foundDiary);
//
//        Diary updatedDiary = dr.findById(foundDiary.getId())
//                .orElseThrow(RuntimeException::new);
//        Assertions.assertThat(updatedDiary.getDescription()).isEqualTo(modify);
////        //////////////////////////////////////////////////////////
////
//        dr.deleteById(saved.getId());
//
//        assertFalse(dr.findById(saved.getId()).isPresent());
//    }
//}