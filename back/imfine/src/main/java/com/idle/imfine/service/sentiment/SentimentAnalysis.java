package com.idle.imfine.service.sentiment;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.comprehend.AmazonComprehend;
import com.amazonaws.services.comprehend.AmazonComprehendClientBuilder;
import com.amazonaws.services.comprehend.model.DetectSentimentRequest;
import com.amazonaws.services.comprehend.model.DetectSentimentResult;
import com.idle.imfine.data.entity.paper.Paper;
import com.idle.imfine.data.repository.paper.PaperRepository;
import com.idle.imfine.errors.code.PaperErrorCode;
import com.idle.imfine.errors.exception.ErrorException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.Random;

@Slf4j
@Component
@RequiredArgsConstructor
public class SentimentAnalysis {

    private final PaperRepository paperRepository;

    @Value("${s3.bucket.path}")
    private String S3_BUCKET_PATH;
    @Value("${aws.access-key}")
    private String AWS_ACCESS_KEY;
    @Value("${aws.secret-key}")
    private String AWS_SECRET_KEY;

    @Async
    public void analyzeText(Long paperId, String text) {
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(AWS_ACCESS_KEY, AWS_SECRET_KEY);

        AmazonComprehend comprehendClient =
                AmazonComprehendClientBuilder.standard()
                        .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                        .withRegion("ap-northeast-2")
                        .build();

        log.info("[SentimentAnalysis] 감정 분석 시작");
        DetectSentimentRequest detectSentimentRequest = new DetectSentimentRequest().withText(text)
                .withLanguageCode("ko");
        DetectSentimentResult detectSentimentResult = comprehendClient.detectSentiment(detectSentimentRequest);
        String result = detectSentimentResult.getSentiment();
        log.info("[SentimentAnalysis] 감정 분석 완료 > {}", result);

        Sentiment sentiment = Sentiment.valueOf(result);
        log.info(sentiment.name(), sentiment.getValue(), sentiment.getName());

        log.info("[SentimentAnalysis] 분석된 감정을 일기에 저장 시작");
        Paper paper = paperRepository.findById(paperId).orElseThrow(() -> new ErrorException(PaperErrorCode.PAPER_NOT_FOUND));
        // sentiment.getValue()를 일기 페이지에 저장
        paperRepository.save(paper);
        log.info("[SentimentAnalysis] 분석된 감정을 일기에 저장 완료");
    }

    public String getMusic(int value) {
        Sentiment[] arr = Sentiment.values();
        String sentiment = arr[value].getName();
        String path = S3_BUCKET_PATH + "/music/" + sentiment + "/";

        Random rand = new Random();
        String filename = rand.nextInt(10) + ".mp3";

        String fullPath = path + filename;

        log.info("play music > {}", fullPath);
        return fullPath;
    }

}
