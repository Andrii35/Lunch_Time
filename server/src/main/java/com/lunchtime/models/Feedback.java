package com.lunchtime.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Setter;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.engine.profile.Fetch;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Setter
@Getter
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ColumnDefault("true")
    @Column(name = "is_active")
    private Boolean isActive;

    @NotNull
    @Column(name = "date")
    private Date date;

    @NotNull
    @Column(name = "user_name")
    private String userName;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "rest_id",referencedColumnName = "id")
    private Restaurant restId;

    @ColumnDefault("0")
    @Column(name = "counter_like")
    private Integer counterLike;

    @ColumnDefault("0")
    @Column(name = "counter_dislike")
    private Integer counterDislike;

    public Feedback() {   }

    public Feedback(Long id, String description, Boolean isActive, Date date,
                    String userName, Restaurant restId, Integer counterLike, Integer counterDislike) {
        this.id = id;
        this.description = description;
        this.isActive = isActive;
        this.date = date;
        this.userName = userName;
        this.restId = restId;
        this.counterLike = counterLike;
        this.counterDislike = counterDislike;
    }

}
